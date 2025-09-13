export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      admin_users: {
        Row: {
          created_at: string | null
          id: string
          permissions: Json | null
          role: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          permissions?: Json | null
          role?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          permissions?: Json | null
          role?: string
          user_id?: string | null
        }
        Relationships: []
      }
      audio_generation_queue: {
        Row: {
          activity_type: string
          audit_notes: string | null
          completed_at: string | null
          compliance_flag: boolean | null
          created_at: string
          created_by: string | null
          id: string
          is_pregenerated: boolean | null
          language: string | null
          last_error: string | null
          master_script: string
          max_retries: number
          metadata: Json | null
          priority: number
          processing_time_seconds: number | null
          release_date: string | null
          retry_count: number
          scheduled_for: string | null
          session_id: string
          session_name: string
          session_type: string
          started_at: string | null
          status: string
          tags: string[] | null
          updated_at: string
          voice_id: string | null
        }
        Insert: {
          activity_type: string
          audit_notes?: string | null
          completed_at?: string | null
          compliance_flag?: boolean | null
          created_at?: string
          created_by?: string | null
          id?: string
          is_pregenerated?: boolean | null
          language?: string | null
          last_error?: string | null
          master_script: string
          max_retries?: number
          metadata?: Json | null
          priority?: number
          processing_time_seconds?: number | null
          release_date?: string | null
          retry_count?: number
          scheduled_for?: string | null
          session_id: string
          session_name: string
          session_type: string
          started_at?: string | null
          status?: string
          tags?: string[] | null
          updated_at?: string
          voice_id?: string | null
        }
        Update: {
          activity_type?: string
          audit_notes?: string | null
          completed_at?: string | null
          compliance_flag?: boolean | null
          created_at?: string
          created_by?: string | null
          id?: string
          is_pregenerated?: boolean | null
          language?: string | null
          last_error?: string | null
          master_script?: string
          max_retries?: number
          metadata?: Json | null
          priority?: number
          processing_time_seconds?: number | null
          release_date?: string | null
          retry_count?: number
          scheduled_for?: string | null
          session_id?: string
          session_name?: string
          session_type?: string
          started_at?: string | null
          status?: string
          tags?: string[] | null
          updated_at?: string
          voice_id?: string | null
        }
        Relationships: []
      }
      audio_generation_stats: {
        Row: {
          avg_processing_time_seconds: number | null
          created_at: string
          date: string
          id: string
          peak_queue_size: number | null
          total_failed: number | null
          total_generated: number | null
          total_pregenerated: number | null
          total_recovered: number | null
          total_retried: number | null
        }
        Insert: {
          avg_processing_time_seconds?: number | null
          created_at?: string
          date: string
          id?: string
          peak_queue_size?: number | null
          total_failed?: number | null
          total_generated?: number | null
          total_pregenerated?: number | null
          total_recovered?: number | null
          total_retried?: number | null
        }
        Update: {
          avg_processing_time_seconds?: number | null
          created_at?: string
          date?: string
          id?: string
          peak_queue_size?: number | null
          total_failed?: number | null
          total_generated?: number | null
          total_pregenerated?: number | null
          total_recovered?: number | null
          total_retried?: number | null
        }
        Relationships: []
      }
      audio_sessions: {
        Row: {
          activity_type: string
          audio_url: string | null
          audit_notes: string | null
          breath_cycle_count: number | null
          compliance_flag: boolean | null
          created_at: string | null
          created_by: string | null
          difficulty_level: string | null
          duration_seconds: number | null
          generated_at: string | null
          generation_queue_id: string | null
          id: string
          is_pregenerated: boolean | null
          language: string | null
          master_script: string
          metadata: Json | null
          processing_time_seconds: number | null
          release_date: string | null
          retry_count: number | null
          session_id: string
          session_name: string
          session_type: string
          status: string
          tags: string[] | null
          updated_at: string | null
          voice_id: string | null
        }
        Insert: {
          activity_type: string
          audio_url?: string | null
          audit_notes?: string | null
          breath_cycle_count?: number | null
          compliance_flag?: boolean | null
          created_at?: string | null
          created_by?: string | null
          difficulty_level?: string | null
          duration_seconds?: number | null
          generated_at?: string | null
          generation_queue_id?: string | null
          id?: string
          is_pregenerated?: boolean | null
          language?: string | null
          master_script: string
          metadata?: Json | null
          processing_time_seconds?: number | null
          release_date?: string | null
          retry_count?: number | null
          session_id: string
          session_name: string
          session_type: string
          status?: string
          tags?: string[] | null
          updated_at?: string | null
          voice_id?: string | null
        }
        Update: {
          activity_type?: string
          audio_url?: string | null
          audit_notes?: string | null
          breath_cycle_count?: number | null
          compliance_flag?: boolean | null
          created_at?: string | null
          created_by?: string | null
          difficulty_level?: string | null
          duration_seconds?: number | null
          generated_at?: string | null
          generation_queue_id?: string | null
          id?: string
          is_pregenerated?: boolean | null
          language?: string | null
          master_script?: string
          metadata?: Json | null
          processing_time_seconds?: number | null
          release_date?: string | null
          retry_count?: number | null
          session_id?: string
          session_name?: string
          session_type?: string
          status?: string
          tags?: string[] | null
          updated_at?: string | null
          voice_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audio_sessions_generation_queue_id_fkey"
            columns: ["generation_queue_id"]
            isOneToOne: false
            referencedRelation: "audio_generation_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      compliance_checks: {
        Row: {
          action_required: boolean | null
          check_type: string | null
          compliance_status: string | null
          content_id: string | null
          created_at: string | null
          findings: string[] | null
          id: string
          recommendations: string[] | null
          resolution_date: string | null
          retreat_id: string | null
          review_date: string | null
          reviewer_id: string | null
        }
        Insert: {
          action_required?: boolean | null
          check_type?: string | null
          compliance_status?: string | null
          content_id?: string | null
          created_at?: string | null
          findings?: string[] | null
          id?: string
          recommendations?: string[] | null
          resolution_date?: string | null
          retreat_id?: string | null
          review_date?: string | null
          reviewer_id?: string | null
        }
        Update: {
          action_required?: boolean | null
          check_type?: string | null
          compliance_status?: string | null
          content_id?: string | null
          created_at?: string | null
          findings?: string[] | null
          id?: string
          recommendations?: string[] | null
          resolution_date?: string | null
          retreat_id?: string | null
          review_date?: string | null
          reviewer_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "compliance_checks_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "content_library"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "compliance_checks_retreat_id_fkey"
            columns: ["retreat_id"]
            isOneToOne: false
            referencedRelation: "retreat_configurations"
            referencedColumns: ["id"]
          },
        ]
      }
      content_library: {
        Row: {
          asset_id: string | null
          compliance_reviewed: boolean | null
          content_type: string
          created_at: string | null
          duration_seconds: number | null
          evidence_based_verified: boolean | null
          file_size_bytes: number | null
          file_url: string | null
          id: string
          is_active: boolean | null
          metadata: Json | null
          reviewer_notes: string | null
          tags: string[] | null
          title: string
          transcript: string | null
          trauma_informed_reviewed: boolean | null
          updated_at: string | null
          version: number | null
        }
        Insert: {
          asset_id?: string | null
          compliance_reviewed?: boolean | null
          content_type: string
          created_at?: string | null
          duration_seconds?: number | null
          evidence_based_verified?: boolean | null
          file_size_bytes?: number | null
          file_url?: string | null
          id?: string
          is_active?: boolean | null
          metadata?: Json | null
          reviewer_notes?: string | null
          tags?: string[] | null
          title: string
          transcript?: string | null
          trauma_informed_reviewed?: boolean | null
          updated_at?: string | null
          version?: number | null
        }
        Update: {
          asset_id?: string | null
          compliance_reviewed?: boolean | null
          content_type?: string
          created_at?: string | null
          duration_seconds?: number | null
          evidence_based_verified?: boolean | null
          file_size_bytes?: number | null
          file_url?: string | null
          id?: string
          is_active?: boolean | null
          metadata?: Json | null
          reviewer_notes?: string | null
          tags?: string[] | null
          title?: string
          transcript?: string | null
          trauma_informed_reviewed?: boolean | null
          updated_at?: string | null
          version?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "content_library_asset_id_fkey"
            columns: ["asset_id"]
            isOneToOne: false
            referencedRelation: "production_assets"
            referencedColumns: ["id"]
          },
        ]
      }
      crisis_protocols: {
        Row: {
          created_at: string | null
          follow_up_scheduled: boolean | null
          id: string
          intervention_taken: string[] | null
          notes: string | null
          professional_contacted: boolean | null
          protocol_activated_at: string | null
          resolution_status: string | null
          risk_level: string | null
          trigger_type: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          follow_up_scheduled?: boolean | null
          id?: string
          intervention_taken?: string[] | null
          notes?: string | null
          professional_contacted?: boolean | null
          protocol_activated_at?: string | null
          resolution_status?: string | null
          risk_level?: string | null
          trigger_type: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          follow_up_scheduled?: boolean | null
          id?: string
          intervention_taken?: string[] | null
          notes?: string | null
          professional_contacted?: boolean | null
          protocol_activated_at?: string | null
          resolution_status?: string | null
          risk_level?: string | null
          trigger_type?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      daily_checkins: {
        Row: {
          challenges: string[] | null
          checkin_date: string
          created_at: string | null
          crisis_flag: boolean | null
          energy_level: number | null
          gratitude_entries: string[] | null
          id: string
          mood_rating: number | null
          needs_support: boolean | null
          reflection_notes: string | null
          sleep_quality: number | null
          stress_level: number | null
          user_retreat_id: string | null
          wins: string[] | null
        }
        Insert: {
          challenges?: string[] | null
          checkin_date: string
          created_at?: string | null
          crisis_flag?: boolean | null
          energy_level?: number | null
          gratitude_entries?: string[] | null
          id?: string
          mood_rating?: number | null
          needs_support?: boolean | null
          reflection_notes?: string | null
          sleep_quality?: number | null
          stress_level?: number | null
          user_retreat_id?: string | null
          wins?: string[] | null
        }
        Update: {
          challenges?: string[] | null
          checkin_date?: string
          created_at?: string | null
          crisis_flag?: boolean | null
          energy_level?: number | null
          gratitude_entries?: string[] | null
          id?: string
          mood_rating?: number | null
          needs_support?: boolean | null
          reflection_notes?: string | null
          sleep_quality?: number | null
          stress_level?: number | null
          user_retreat_id?: string | null
          wins?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "daily_checkins_user_retreat_id_fkey"
            columns: ["user_retreat_id"]
            isOneToOne: false
            referencedRelation: "user_retreats"
            referencedColumns: ["id"]
          },
        ]
      }
      generation_logs: {
        Row: {
          category: string | null
          created_at: string | null
          details: Json | null
          id: string
          log_level: string
          message: string
          queue_id: string | null
          session_id: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          details?: Json | null
          id?: string
          log_level: string
          message: string
          queue_id?: string | null
          session_id?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          details?: Json | null
          id?: string
          log_level?: string
          message?: string
          queue_id?: string | null
          session_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "generation_logs_queue_id_fkey"
            columns: ["queue_id"]
            isOneToOne: false
            referencedRelation: "audio_generation_queue"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "generation_logs_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "audio_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      intake_assessments: {
        Row: {
          completed_at: string | null
          consent_data: Json | null
          created_at: string | null
          demographics_data: Json | null
          goals_data: Json | null
          id: string
          is_completed: boolean | null
          lifestyle_data: Json | null
          presenting_concerns_data: Json | null
          retreat_recommendations: Json | null
          risk_assessment: Json | null
          safety_data: Json | null
          updated_at: string | null
          user_id: string | null
          wellbeing_screening_data: Json | null
        }
        Insert: {
          completed_at?: string | null
          consent_data?: Json | null
          created_at?: string | null
          demographics_data?: Json | null
          goals_data?: Json | null
          id?: string
          is_completed?: boolean | null
          lifestyle_data?: Json | null
          presenting_concerns_data?: Json | null
          retreat_recommendations?: Json | null
          risk_assessment?: Json | null
          safety_data?: Json | null
          updated_at?: string | null
          user_id?: string | null
          wellbeing_screening_data?: Json | null
        }
        Update: {
          completed_at?: string | null
          consent_data?: Json | null
          created_at?: string | null
          demographics_data?: Json | null
          goals_data?: Json | null
          id?: string
          is_completed?: boolean | null
          lifestyle_data?: Json | null
          presenting_concerns_data?: Json | null
          retreat_recommendations?: Json | null
          risk_assessment?: Json | null
          safety_data?: Json | null
          updated_at?: string | null
          user_id?: string | null
          wellbeing_screening_data?: Json | null
        }
        Relationships: []
      }
      intake_progress: {
        Row: {
          created_at: string
          current_step: number | null
          id: string
          is_completed: boolean | null
          last_saved_at: string
          progress_data: Json
          section: string
          total_steps: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          current_step?: number | null
          id?: string
          is_completed?: boolean | null
          last_saved_at?: string
          progress_data?: Json
          section: string
          total_steps?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          current_step?: number | null
          id?: string
          is_completed?: boolean | null
          last_saved_at?: string
          progress_data?: Json
          section?: string
          total_steps?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      production_assets: {
        Row: {
          assigned_to: string | null
          completion_date: string | null
          created_at: string | null
          day_module: string
          download_link: string | null
          edit_task: string | null
          estimated_hours: number | null
          format: string
          id: string
          internal_storage_path: string | null
          notes: string | null
          original_file_name: string
          priority: string | null
          retreat_id: string | null
          source: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          assigned_to?: string | null
          completion_date?: string | null
          created_at?: string | null
          day_module: string
          download_link?: string | null
          edit_task?: string | null
          estimated_hours?: number | null
          format: string
          id?: string
          internal_storage_path?: string | null
          notes?: string | null
          original_file_name: string
          priority?: string | null
          retreat_id?: string | null
          source: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          assigned_to?: string | null
          completion_date?: string | null
          created_at?: string | null
          day_module?: string
          download_link?: string | null
          edit_task?: string | null
          estimated_hours?: number | null
          format?: string
          id?: string
          internal_storage_path?: string | null
          notes?: string | null
          original_file_name?: string
          priority?: string | null
          retreat_id?: string | null
          source?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "production_assets_retreat_id_fkey"
            columns: ["retreat_id"]
            isOneToOne: false
            referencedRelation: "retreat_configurations"
            referencedColumns: ["id"]
          },
        ]
      }
      professional_referrals: {
        Row: {
          created_at: string | null
          follow_up_date: string | null
          id: string
          notes: string | null
          reason: string
          recommended_providers: Json | null
          referral_status: string | null
          referral_type: string | null
          updated_at: string | null
          urgency_level: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          follow_up_date?: string | null
          id?: string
          notes?: string | null
          reason: string
          recommended_providers?: Json | null
          referral_status?: string | null
          referral_type?: string | null
          updated_at?: string | null
          urgency_level?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          follow_up_date?: string | null
          id?: string
          notes?: string | null
          reason?: string
          recommended_providers?: Json | null
          referral_status?: string | null
          referral_type?: string | null
          updated_at?: string | null
          urgency_level?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          accessibility_needs: string[] | null
          created_at: string
          demographics_data: Json | null
          email: string | null
          full_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          accessibility_needs?: string[] | null
          created_at?: string
          demographics_data?: Json | null
          email?: string | null
          full_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          accessibility_needs?: string[] | null
          created_at?: string
          demographics_data?: Json | null
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      queue_processor_state: {
        Row: {
          concurrent_limit: number | null
          created_at: string
          id: string
          is_paused: boolean | null
          is_running: boolean | null
          last_heartbeat: string | null
          last_processed_queue_id: string | null
          processor_name: string
          total_failures: number | null
          total_processed: number | null
          updated_at: string
        }
        Insert: {
          concurrent_limit?: number | null
          created_at?: string
          id?: string
          is_paused?: boolean | null
          is_running?: boolean | null
          last_heartbeat?: string | null
          last_processed_queue_id?: string | null
          processor_name: string
          total_failures?: number | null
          total_processed?: number | null
          updated_at?: string
        }
        Update: {
          concurrent_limit?: number | null
          created_at?: string
          id?: string
          is_paused?: boolean | null
          is_running?: boolean | null
          last_heartbeat?: string | null
          last_processed_queue_id?: string | null
          processor_name?: string
          total_failures?: number | null
          total_processed?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      retreat_activities: {
        Row: {
          activity_name: string
          activity_type: string | null
          contraindications: string[] | null
          created_at: string | null
          day_number: number
          description: string | null
          difficulty_level: string | null
          duration_minutes: number | null
          evidence_base: string | null
          id: string
          instructions: string | null
          is_optional: boolean | null
          modifications: string[] | null
          required_materials: string[] | null
          retreat_id: string | null
          time_slot: string
          trauma_considerations: string[] | null
          updated_at: string | null
        }
        Insert: {
          activity_name: string
          activity_type?: string | null
          contraindications?: string[] | null
          created_at?: string | null
          day_number: number
          description?: string | null
          difficulty_level?: string | null
          duration_minutes?: number | null
          evidence_base?: string | null
          id?: string
          instructions?: string | null
          is_optional?: boolean | null
          modifications?: string[] | null
          required_materials?: string[] | null
          retreat_id?: string | null
          time_slot: string
          trauma_considerations?: string[] | null
          updated_at?: string | null
        }
        Update: {
          activity_name?: string
          activity_type?: string | null
          contraindications?: string[] | null
          created_at?: string | null
          day_number?: number
          description?: string | null
          difficulty_level?: string | null
          duration_minutes?: number | null
          evidence_base?: string | null
          id?: string
          instructions?: string | null
          is_optional?: boolean | null
          modifications?: string[] | null
          required_materials?: string[] | null
          retreat_id?: string | null
          time_slot?: string
          trauma_considerations?: string[] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "retreat_activities_retreat_id_fkey"
            columns: ["retreat_id"]
            isOneToOne: false
            referencedRelation: "retreat_configurations"
            referencedColumns: ["id"]
          },
        ]
      }
      retreat_configurations: {
        Row: {
          contraindications: string[] | null
          created_at: string | null
          description: string | null
          duration_days: number
          evidence_based_therapies: string[] | null
          focus_areas: string[] | null
          id: string
          is_active: boolean | null
          name: string
          principles: string[] | null
          requires_supervision: boolean | null
          risk_level: string | null
          short_description: string | null
          slug: string
          target_conditions: string[] | null
          trauma_informed_adaptations: Json | null
          updated_at: string | null
        }
        Insert: {
          contraindications?: string[] | null
          created_at?: string | null
          description?: string | null
          duration_days: number
          evidence_based_therapies?: string[] | null
          focus_areas?: string[] | null
          id?: string
          is_active?: boolean | null
          name: string
          principles?: string[] | null
          requires_supervision?: boolean | null
          risk_level?: string | null
          short_description?: string | null
          slug: string
          target_conditions?: string[] | null
          trauma_informed_adaptations?: Json | null
          updated_at?: string | null
        }
        Update: {
          contraindications?: string[] | null
          created_at?: string | null
          description?: string | null
          duration_days?: number
          evidence_based_therapies?: string[] | null
          focus_areas?: string[] | null
          id?: string
          is_active?: boolean | null
          name?: string
          principles?: string[] | null
          requires_supervision?: boolean | null
          risk_level?: string | null
          short_description?: string | null
          slug?: string
          target_conditions?: string[] | null
          trauma_informed_adaptations?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
      retreat_effectiveness: {
        Row: {
          analysis_period_end: string | null
          analysis_period_start: string | null
          average_outcome_improvement: number | null
          average_satisfaction: number | null
          common_challenges: string[] | null
          completion_rate: number | null
          created_at: string | null
          id: string
          recommended_improvements: string[] | null
          retreat_id: string | null
          success_factors: string[] | null
          total_completions: number | null
          total_enrollments: number | null
          updated_at: string | null
        }
        Insert: {
          analysis_period_end?: string | null
          analysis_period_start?: string | null
          average_outcome_improvement?: number | null
          average_satisfaction?: number | null
          common_challenges?: string[] | null
          completion_rate?: number | null
          created_at?: string | null
          id?: string
          recommended_improvements?: string[] | null
          retreat_id?: string | null
          success_factors?: string[] | null
          total_completions?: number | null
          total_enrollments?: number | null
          updated_at?: string | null
        }
        Update: {
          analysis_period_end?: string | null
          analysis_period_start?: string | null
          average_outcome_improvement?: number | null
          average_satisfaction?: number | null
          common_challenges?: string[] | null
          completion_rate?: number | null
          created_at?: string | null
          id?: string
          recommended_improvements?: string[] | null
          retreat_id?: string | null
          success_factors?: string[] | null
          total_completions?: number | null
          total_enrollments?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "retreat_effectiveness_retreat_id_fkey"
            columns: ["retreat_id"]
            isOneToOne: false
            referencedRelation: "retreat_configurations"
            referencedColumns: ["id"]
          },
        ]
      }
      retreat_modules: {
        Row: {
          accessibility_captions: boolean
          accessibility_transcript: boolean
          area_name: string
          content_included: boolean
          created_at: string
          delivery_audio: boolean
          delivery_live: boolean
          delivery_pdf: boolean
          delivery_video: boolean
          module_id: string
          outcome_defined: boolean
          retreat_id: string
          updated_at: string
        }
        Insert: {
          accessibility_captions?: boolean
          accessibility_transcript?: boolean
          area_name: string
          content_included?: boolean
          created_at?: string
          delivery_audio?: boolean
          delivery_live?: boolean
          delivery_pdf?: boolean
          delivery_video?: boolean
          module_id?: string
          outcome_defined?: boolean
          retreat_id: string
          updated_at?: string
        }
        Update: {
          accessibility_captions?: boolean
          accessibility_transcript?: boolean
          area_name?: string
          content_included?: boolean
          created_at?: string
          delivery_audio?: boolean
          delivery_live?: boolean
          delivery_pdf?: boolean
          delivery_video?: boolean
          module_id?: string
          outcome_defined?: boolean
          retreat_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "retreat_modules_retreat_id_fkey"
            columns: ["retreat_id"]
            isOneToOne: false
            referencedRelation: "retreats"
            referencedColumns: ["retreat_id"]
          },
        ]
      }
      retreat_progress: {
        Row: {
          activity_id: string | null
          challenges_encountered: string[] | null
          completed_at: string | null
          completion_time_minutes: number | null
          created_at: string | null
          day_number: number
          id: string
          insights: string | null
          notes: string | null
          status: string | null
          updated_at: string | null
          user_rating: number | null
          user_retreat_id: string | null
        }
        Insert: {
          activity_id?: string | null
          challenges_encountered?: string[] | null
          completed_at?: string | null
          completion_time_minutes?: number | null
          created_at?: string | null
          day_number: number
          id?: string
          insights?: string | null
          notes?: string | null
          status?: string | null
          updated_at?: string | null
          user_rating?: number | null
          user_retreat_id?: string | null
        }
        Update: {
          activity_id?: string | null
          challenges_encountered?: string[] | null
          completed_at?: string | null
          completion_time_minutes?: number | null
          created_at?: string | null
          day_number?: number
          id?: string
          insights?: string | null
          notes?: string | null
          status?: string | null
          updated_at?: string | null
          user_rating?: number | null
          user_retreat_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "retreat_progress_activity_id_fkey"
            columns: ["activity_id"]
            isOneToOne: false
            referencedRelation: "retreat_activities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "retreat_progress_user_retreat_id_fkey"
            columns: ["user_retreat_id"]
            isOneToOne: false
            referencedRelation: "user_retreats"
            referencedColumns: ["id"]
          },
        ]
      }
      retreats: {
        Row: {
          completeness_score: number | null
          created_at: string
          launch_date: string | null
          retreat_id: string
          retreat_name: string
          risk_flag: string | null
          updated_at: string
        }
        Insert: {
          completeness_score?: number | null
          created_at?: string
          launch_date?: string | null
          retreat_id?: string
          retreat_name: string
          risk_flag?: string | null
          updated_at?: string
        }
        Update: {
          completeness_score?: number | null
          created_at?: string
          launch_date?: string | null
          retreat_id?: string
          retreat_name?: string
          risk_flag?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      risk_assessments: {
        Row: {
          assessment_id: string | null
          contraindications: string[] | null
          created_at: string | null
          crisis_intervention_needed: boolean | null
          id: string
          intervention_recommendations: string[] | null
          overall_risk_level: string | null
          professional_referral_required: boolean | null
          protective_factors: Json | null
          risk_factors: Json | null
          safety_plan_needed: boolean | null
          self_harm_risk: boolean | null
          substance_abuse_risk: boolean | null
          suicide_risk: boolean | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          assessment_id?: string | null
          contraindications?: string[] | null
          created_at?: string | null
          crisis_intervention_needed?: boolean | null
          id?: string
          intervention_recommendations?: string[] | null
          overall_risk_level?: string | null
          professional_referral_required?: boolean | null
          protective_factors?: Json | null
          risk_factors?: Json | null
          safety_plan_needed?: boolean | null
          self_harm_risk?: boolean | null
          substance_abuse_risk?: boolean | null
          suicide_risk?: boolean | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          assessment_id?: string | null
          contraindications?: string[] | null
          created_at?: string | null
          crisis_intervention_needed?: boolean | null
          id?: string
          intervention_recommendations?: string[] | null
          overall_risk_level?: string | null
          professional_referral_required?: boolean | null
          protective_factors?: Json | null
          risk_factors?: Json | null
          safety_plan_needed?: boolean | null
          self_harm_risk?: boolean | null
          substance_abuse_risk?: boolean | null
          suicide_risk?: boolean | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "risk_assessments_assessment_id_fkey"
            columns: ["assessment_id"]
            isOneToOne: false
            referencedRelation: "intake_assessments"
            referencedColumns: ["id"]
          },
        ]
      }
      screening_results: {
        Row: {
          completed_at: string | null
          created_at: string | null
          id: string
          interpretation: string | null
          max_score: number
          recommendations: string[] | null
          risk_flags: string[] | null
          risk_level: string | null
          score: number
          session_id: string | null
          tool_id: string
          tool_name: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          id?: string
          interpretation?: string | null
          max_score: number
          recommendations?: string[] | null
          risk_flags?: string[] | null
          risk_level?: string | null
          score: number
          session_id?: string | null
          tool_id: string
          tool_name: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          id?: string
          interpretation?: string | null
          max_score?: number
          recommendations?: string[] | null
          risk_flags?: string[] | null
          risk_level?: string | null
          score?: number
          session_id?: string | null
          tool_id?: string
          tool_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "screening_results_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "screening_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      screening_sessions: {
        Row: {
          completed_at: string | null
          created_at: string | null
          crisis_flags: boolean | null
          id: string
          overall_risk_level: string | null
          professional_referral_needed: boolean | null
          recommendations: string[] | null
          referrals: string[] | null
          session_type: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          crisis_flags?: boolean | null
          id?: string
          overall_risk_level?: string | null
          professional_referral_needed?: boolean | null
          recommendations?: string[] | null
          referrals?: string[] | null
          session_type: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          crisis_flags?: boolean | null
          id?: string
          overall_risk_level?: string | null
          professional_referral_needed?: boolean | null
          recommendations?: string[] | null
          referrals?: string[] | null
          session_type?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      session_pregeneration_schedule: {
        Row: {
          activity_id: string
          created_at: string
          generation_queue_id: string | null
          id: string
          is_generated: boolean | null
          is_scheduled: boolean | null
          pregenerate_hours_before: number
          retreat_id: string
          scheduled_release_date: string
          session_name: string
          updated_at: string
        }
        Insert: {
          activity_id: string
          created_at?: string
          generation_queue_id?: string | null
          id?: string
          is_generated?: boolean | null
          is_scheduled?: boolean | null
          pregenerate_hours_before?: number
          retreat_id: string
          scheduled_release_date: string
          session_name: string
          updated_at?: string
        }
        Update: {
          activity_id?: string
          created_at?: string
          generation_queue_id?: string | null
          id?: string
          is_generated?: boolean | null
          is_scheduled?: boolean | null
          pregenerate_hours_before?: number
          retreat_id?: string
          scheduled_release_date?: string
          session_name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "session_pregeneration_schedule_generation_queue_id_fkey"
            columns: ["generation_queue_id"]
            isOneToOne: false
            referencedRelation: "audio_generation_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      trauma_informed_flags: {
        Row: {
          alternative_content_id: string | null
          content_id: string | null
          created_at: string | null
          description: string
          flag_type: string | null
          id: string
          recommendations: string[] | null
          reviewed_by: string | null
          severity: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          alternative_content_id?: string | null
          content_id?: string | null
          created_at?: string | null
          description: string
          flag_type?: string | null
          id?: string
          recommendations?: string[] | null
          reviewed_by?: string | null
          severity?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          alternative_content_id?: string | null
          content_id?: string | null
          created_at?: string | null
          description?: string
          flag_type?: string | null
          id?: string
          recommendations?: string[] | null
          reviewed_by?: string | null
          severity?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "trauma_informed_flags_alternative_content_id_fkey"
            columns: ["alternative_content_id"]
            isOneToOne: false
            referencedRelation: "content_library"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "trauma_informed_flags_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "content_library"
            referencedColumns: ["id"]
          },
        ]
      }
      user_outcomes: {
        Row: {
          created_at: string | null
          custom_metrics: Json | null
          gad7_score: number | null
          id: string
          measurement_date: string | null
          measurement_type: string | null
          notes: string | null
          phq9_score: number | null
          retreat_id: string | null
          stress_score: number | null
          user_id: string | null
          wellbeing_score: number | null
        }
        Insert: {
          created_at?: string | null
          custom_metrics?: Json | null
          gad7_score?: number | null
          id?: string
          measurement_date?: string | null
          measurement_type?: string | null
          notes?: string | null
          phq9_score?: number | null
          retreat_id?: string | null
          stress_score?: number | null
          user_id?: string | null
          wellbeing_score?: number | null
        }
        Update: {
          created_at?: string | null
          custom_metrics?: Json | null
          gad7_score?: number | null
          id?: string
          measurement_date?: string | null
          measurement_type?: string | null
          notes?: string | null
          phq9_score?: number | null
          retreat_id?: string | null
          stress_score?: number | null
          user_id?: string | null
          wellbeing_score?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "user_outcomes_retreat_id_fkey"
            columns: ["retreat_id"]
            isOneToOne: false
            referencedRelation: "retreat_configurations"
            referencedColumns: ["id"]
          },
        ]
      }
      user_preferences: {
        Row: {
          accessibility_needs: string[] | null
          communication_preferences: Json | null
          created_at: string | null
          id: string
          intensity_preference: string | null
          notification_settings: Json | null
          preferred_modalities: string[] | null
          privacy_settings: Json | null
          time_commitment_preference: string | null
          trigger_warnings: string[] | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          accessibility_needs?: string[] | null
          communication_preferences?: Json | null
          created_at?: string | null
          id?: string
          intensity_preference?: string | null
          notification_settings?: Json | null
          preferred_modalities?: string[] | null
          privacy_settings?: Json | null
          time_commitment_preference?: string | null
          trigger_warnings?: string[] | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          accessibility_needs?: string[] | null
          communication_preferences?: Json | null
          created_at?: string | null
          id?: string
          intensity_preference?: string | null
          notification_settings?: Json | null
          preferred_modalities?: string[] | null
          privacy_settings?: Json | null
          time_commitment_preference?: string | null
          trigger_warnings?: string[] | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_retreats: {
        Row: {
          actual_end_date: string | null
          additional_support: string[] | null
          completion_percentage: number | null
          created_at: string | null
          expected_end_date: string | null
          gentle_mode: boolean | null
          id: string
          intake_assessment_id: string | null
          personalization_data: Json | null
          retreat_id: string | null
          skip_activities: string[] | null
          start_date: string | null
          status: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          actual_end_date?: string | null
          additional_support?: string[] | null
          completion_percentage?: number | null
          created_at?: string | null
          expected_end_date?: string | null
          gentle_mode?: boolean | null
          id?: string
          intake_assessment_id?: string | null
          personalization_data?: Json | null
          retreat_id?: string | null
          skip_activities?: string[] | null
          start_date?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          actual_end_date?: string | null
          additional_support?: string[] | null
          completion_percentage?: number | null
          created_at?: string | null
          expected_end_date?: string | null
          gentle_mode?: boolean | null
          id?: string
          intake_assessment_id?: string | null
          personalization_data?: Json | null
          retreat_id?: string | null
          skip_activities?: string[] | null
          start_date?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_retreats_intake_assessment_id_fkey"
            columns: ["intake_assessment_id"]
            isOneToOne: false
            referencedRelation: "intake_assessments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_retreats_retreat_id_fkey"
            columns: ["retreat_id"]
            isOneToOne: false
            referencedRelation: "retreat_configurations"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      recalculate_retreat_completeness: {
        Args: { recalc_retreat_id: string }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
