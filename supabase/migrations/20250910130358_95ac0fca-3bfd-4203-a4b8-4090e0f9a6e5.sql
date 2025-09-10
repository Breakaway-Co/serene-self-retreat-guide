-- Create retreats and retreat_modules with completeness scoring and RLS

-- 1) Retreats table
CREATE TABLE IF NOT EXISTS public.retreats (
  retreat_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  retreat_name text NOT NULL,
  launch_date date,
  completeness_score numeric(5,2),
  risk_flag text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.retreats ENABLE ROW LEVEL SECURITY;

-- Admin-only full access to retreats
DROP POLICY IF EXISTS "Admin can manage retreats" ON public.retreats;
CREATE POLICY "Admin can manage retreats"
ON public.retreats
AS RESTRICTIVE
FOR ALL
USING (EXISTS (SELECT 1 FROM public.admin_users WHERE admin_users.user_id = auth.uid()))
WITH CHECK (EXISTS (SELECT 1 FROM public.admin_users WHERE admin_users.user_id = auth.uid()));

-- updated_at trigger for retreats
DROP TRIGGER IF EXISTS update_retreats_updated_at ON public.retreats;
CREATE TRIGGER update_retreats_updated_at
BEFORE UPDATE ON public.retreats
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- 2) Retreat modules table
CREATE TABLE IF NOT EXISTS public.retreat_modules (
  module_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  retreat_id uuid NOT NULL REFERENCES public.retreats(retreat_id) ON DELETE CASCADE,
  area_name text NOT NULL,
  content_included boolean NOT NULL DEFAULT false,
  delivery_video boolean NOT NULL DEFAULT false,
  delivery_audio boolean NOT NULL DEFAULT false,
  delivery_pdf boolean NOT NULL DEFAULT false,
  delivery_live boolean NOT NULL DEFAULT false,
  accessibility_captions boolean NOT NULL DEFAULT false,
  accessibility_transcript boolean NOT NULL DEFAULT false,
  outcome_defined boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_retreat_modules_retreat_id ON public.retreat_modules(retreat_id);

ALTER TABLE public.retreat_modules ENABLE ROW LEVEL SECURITY;

-- Admin-only full access to retreat_modules
DROP POLICY IF EXISTS "Admin can manage retreat modules" ON public.retreat_modules;
CREATE POLICY "Admin can manage retreat modules"
ON public.retreat_modules
AS RESTRICTIVE
FOR ALL
USING (EXISTS (SELECT 1 FROM public.admin_users WHERE admin_users.user_id = auth.uid()))
WITH CHECK (EXISTS (SELECT 1 FROM public.admin_users WHERE admin_users.user_id = auth.uid()));

-- updated_at trigger for retreat_modules
DROP TRIGGER IF EXISTS update_retreat_modules_updated_at ON public.retreat_modules;
CREATE TRIGGER update_retreat_modules_updated_at
BEFORE UPDATE ON public.retreat_modules
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- 3) Scoring function + trigger to keep retreats.completeness_score & risk_flag up to date
CREATE OR REPLACE FUNCTION public.recalculate_retreat_completeness(recalc_retreat_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  module_count int;
  true_flags int;
  total_possible int;
  completeness_percent numeric(5,2);
  new_risk text;
BEGIN
  SELECT 
    COUNT(*)::int,
    COALESCE(SUM(
      (CASE WHEN content_included THEN 1 ELSE 0 END) +
      (CASE WHEN delivery_video THEN 1 ELSE 0 END) +
      (CASE WHEN delivery_audio THEN 1 ELSE 0 END) +
      (CASE WHEN delivery_pdf THEN 1 ELSE 0 END) +
      (CASE WHEN delivery_live THEN 1 ELSE 0 END) +
      (CASE WHEN accessibility_captions THEN 1 ELSE 0 END) +
      (CASE WHEN accessibility_transcript THEN 1 ELSE 0 END) +
      (CASE WHEN outcome_defined THEN 1 ELSE 0 END)
    ),0)::int
  INTO module_count, true_flags
  FROM public.retreat_modules
  WHERE retreat_id = recalc_retreat_id;

  total_possible := module_count * 8;

  IF total_possible = 0 THEN
    completeness_percent := NULL;
    new_risk := NULL;
  ELSE
    completeness_percent := ROUND((true_flags::numeric / total_possible::numeric) * 100.0, 2);
    IF completeness_percent >= 90 THEN
      new_risk := 'Green – Low Risk';
    ELSIF completeness_percent >= 75 THEN
      new_risk := 'Amber – Moderate Risk';
    ELSE
      new_risk := 'Red – High Risk';
    END IF;
  END IF;

  UPDATE public.retreats
  SET completeness_score = completeness_percent,
      risk_flag = new_risk,
      updated_at = now()
  WHERE retreat_id = recalc_retreat_id;
END;
$$;

-- Trigger wrapper to detect affected retreat_id on DML
CREATE OR REPLACE FUNCTION public.trigger_recalc_retreat_completeness()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  target uuid;
BEGIN
  IF (TG_OP = 'DELETE') THEN
    target := OLD.retreat_id;
  ELSE
    target := NEW.retreat_id;
  END IF;

  PERFORM public.recalculate_retreat_completeness(target);
  RETURN COALESCE(NEW, OLD);
END;
$$;

-- Attach trigger to retreat_modules
DROP TRIGGER IF EXISTS recalc_retreat_completeness_after_change ON public.retreat_modules;
CREATE TRIGGER recalc_retreat_completeness_after_change
AFTER INSERT OR UPDATE OR DELETE ON public.retreat_modules
FOR EACH ROW
EXECUTE FUNCTION public.trigger_recalc_retreat_completeness();