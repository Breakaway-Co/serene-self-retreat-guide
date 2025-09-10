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
      profiles: {
        Row: {
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
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
