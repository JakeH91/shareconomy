export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          country: string | null;
          email: string | null;
          first_name: string | null;
          id: string;
          last_name: string | null;
          newsletter: string | null;
          postcode: string | null;
          updated_at: string | null;
        };
        Insert: {
          country?: string | null;
          email?: string | null;
          first_name?: string | null;
          id: string;
          last_name?: string | null;
          newsletter?: string | null;
          postcode?: string | null;
          updated_at?: string | null;
        };
        Update: {
          country?: string | null;
          email?: string | null;
          first_name?: string | null;
          id?: string;
          last_name?: string | null;
          newsletter?: string | null;
          postcode?: string | null;
          updated_at?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
