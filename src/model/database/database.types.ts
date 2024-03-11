export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      __EFMigrationsHistory: {
        Row: {
          MigrationId: string
          ProductVersion: string
        }
        Insert: {
          MigrationId: string
          ProductVersion: string
        }
        Update: {
          MigrationId?: string
          ProductVersion?: string
        }
        Relationships: []
      }
      farm_frenzy_one_product: {
        Row: {
          id: string
          image: string
          name: string
          price: number
        }
        Insert: {
          id: string
          image: string
          name: string
          price: number
        }
        Update: {
          id?: string
          image?: string
          name?: string
          price?: number
        }
        Relationships: []
      }
      farm_frenzy_three_product: {
        Row: {
          id: string
          image: string
          name: string
          price: number
        }
        Insert: {
          id: string
          image: string
          name: string
          price: number
        }
        Update: {
          id?: string
          image?: string
          name?: string
          price?: number
        }
        Relationships: []
      }
      farm_frenzy_two_pizza_product: {
        Row: {
          id: string
          image: string
          name: string
          price: number
        }
        Insert: {
          id: string
          image: string
          name: string
          price: number
        }
        Update: {
          id?: string
          image?: string
          name?: string
          price?: number
        }
        Relationships: []
      }
      farm_frenzy_two_product: {
        Row: {
          id: string
          image: string
          name: string
          price: number
        }
        Insert: {
          id: string
          image: string
          name: string
          price: number
        }
        Update: {
          id?: string
          image?: string
          name?: string
          price?: number
        }
        Relationships: []
      }
      hayday_building: {
        Row: {
          id: string
          image: string
          level: number
          name: string
          price: number
          time: number
          xp: number
        }
        Insert: {
          id: string
          image: string
          level: number
          name: string
          price: number
          time: number
          xp: number
        }
        Update: {
          id?: string
          image?: string
          level?: number
          name?: string
          price?: number
          time?: number
          xp?: number
        }
        Relationships: []
      }
      hayday_ingredient: {
        Row: {
          id: string
          ingredient_id: string
          product_id: string
          quantity: number
        }
        Insert: {
          id: string
          ingredient_id: string
          product_id: string
          quantity: number
        }
        Update: {
          id?: string
          ingredient_id?: string
          product_id?: string
          quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "FK_hayday_ingredient_hayday_product_ingredient_id"
            columns: ["ingredient_id"]
            isOneToOne: false
            referencedRelation: "hayday_product"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "FK_hayday_ingredient_hayday_product_product_id"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "hayday_product"
            referencedColumns: ["id"]
          }
        ]
      }
      hayday_producer: {
        Row: {
          building_id: string
          id: string
          product_id: string
        }
        Insert: {
          building_id: string
          id: string
          product_id: string
        }
        Update: {
          building_id?: string
          id?: string
          product_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "FK_hayday_producer_hayday_building_building_id"
            columns: ["building_id"]
            isOneToOne: false
            referencedRelation: "hayday_building"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "FK_hayday_producer_hayday_product_product_id"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "hayday_product"
            referencedColumns: ["id"]
          }
        ]
      }
      hayday_product: {
        Row: {
          category: string
          id: string
          image: string
          is_raw: boolean
          level: number
          name: string
          price: number
          time: number
          xp: number
        }
        Insert: {
          category: string
          id: string
          image: string
          is_raw: boolean
          level: number
          name: string
          price: number
          time: number
          xp: number
        }
        Update: {
          category?: string
          id?: string
          image?: string
          is_raw?: boolean
          level?: number
          name?: string
          price?: number
          time?: number
          xp?: number
        }
        Relationships: []
      }
      nasi_goreng_burned_food: {
        Row: {
          category: string
          id: string
          image: string
          name: string
        }
        Insert: {
          category: string
          id: string
          image: string
          name: string
        }
        Update: {
          category?: string
          id?: string
          image?: string
          name?: string
        }
        Relationships: []
      }
      nasi_goreng_fried_rice: {
        Row: {
          description: string
          id: string
          name: string
          plate_id: string
          price: number
          raw_image: string
          raw_layer_number: number
          raw_x_coordinate: number
          raw_y_coordinate: number
          tool_id: string
        }
        Insert: {
          description: string
          id: string
          name: string
          plate_id: string
          price: number
          raw_image: string
          raw_layer_number: number
          raw_x_coordinate: number
          raw_y_coordinate: number
          tool_id: string
        }
        Update: {
          description?: string
          id?: string
          name?: string
          plate_id?: string
          price?: number
          raw_image?: string
          raw_layer_number?: number
          raw_x_coordinate?: number
          raw_y_coordinate?: number
          tool_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "FK_nasi_goreng_fried_rice_nasi_goreng_plate_plate_id"
            columns: ["plate_id"]
            isOneToOne: false
            referencedRelation: "nasi_goreng_plate"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "FK_nasi_goreng_fried_rice_nasi_goreng_tool_tool_id"
            columns: ["tool_id"]
            isOneToOne: false
            referencedRelation: "nasi_goreng_tool"
            referencedColumns: ["id"]
          }
        ]
      }
      nasi_goreng_fried_rice_level: {
        Row: {
          fried_rice_id: string
          fried_rices_needed: number
          id: string
          image: string
          level: number
        }
        Insert: {
          fried_rice_id: string
          fried_rices_needed: number
          id: string
          image: string
          level: number
        }
        Update: {
          fried_rice_id?: string
          fried_rices_needed?: number
          id?: string
          image?: string
          level?: number
        }
        Relationships: [
          {
            foreignKeyName: "FK_nasi_goreng_fried_rice_level_nasi_goreng_fried_rice_fried_r~"
            columns: ["fried_rice_id"]
            isOneToOne: false
            referencedRelation: "nasi_goreng_fried_rice"
            referencedColumns: ["id"]
          }
        ]
      }
      nasi_goreng_fried_rice_level_detail: {
        Row: {
          flip_image_type: number
          fried_rice_level_id: string
          id: string
          layer_number: number
          upgrade_id: string
          x_coordinate: number
          y_coordinate: number
        }
        Insert: {
          flip_image_type: number
          fried_rice_level_id: string
          id: string
          layer_number: number
          upgrade_id: string
          x_coordinate: number
          y_coordinate: number
        }
        Update: {
          flip_image_type?: number
          fried_rice_level_id?: string
          id?: string
          layer_number?: number
          upgrade_id?: string
          x_coordinate?: number
          y_coordinate?: number
        }
        Relationships: [
          {
            foreignKeyName: "FK_nasi_goreng_fried_rice_level_detail_nasi_goreng_fried_rice_~"
            columns: ["fried_rice_level_id"]
            isOneToOne: false
            referencedRelation: "nasi_goreng_fried_rice_level"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "FK_nasi_goreng_fried_rice_level_detail_nasi_goreng_upgrade_upg~"
            columns: ["upgrade_id"]
            isOneToOne: false
            referencedRelation: "nasi_goreng_upgrade"
            referencedColumns: ["id"]
          }
        ]
      }
      nasi_goreng_fried_rice_level_recipe: {
        Row: {
          fried_rice_level_id: string
          id: string
          ingredient_id: string
          quantity: number
        }
        Insert: {
          fried_rice_level_id: string
          id: string
          ingredient_id: string
          quantity: number
        }
        Update: {
          fried_rice_level_id?: string
          id?: string
          ingredient_id?: string
          quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "FK_nasi_goreng_fried_rice_level_recipe_nasi_goreng_fried_rice_~"
            columns: ["fried_rice_level_id"]
            isOneToOne: false
            referencedRelation: "nasi_goreng_fried_rice_level"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "FK_nasi_goreng_fried_rice_level_recipe_nasi_goreng_ingredient_~"
            columns: ["ingredient_id"]
            isOneToOne: false
            referencedRelation: "nasi_goreng_ingredient"
            referencedColumns: ["id"]
          }
        ]
      }
      nasi_goreng_ingredient: {
        Row: {
          category: string
          description: string
          id: string
          image: string
          is_processed: boolean
          name: string
          price: number
        }
        Insert: {
          category: string
          description: string
          id: string
          image: string
          is_processed: boolean
          name: string
          price: number
        }
        Update: {
          category?: string
          description?: string
          id?: string
          image?: string
          is_processed?: boolean
          name?: string
          price?: number
        }
        Relationships: []
      }
      nasi_goreng_ingredient_recipe: {
        Row: {
          id: string
          ingredient_needed_id: string
          result_id: string
        }
        Insert: {
          id: string
          ingredient_needed_id: string
          result_id: string
        }
        Update: {
          id?: string
          ingredient_needed_id?: string
          result_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "FK_nasi_goreng_ingredient_recipe_nasi_goreng_ingredient_ingred~"
            columns: ["ingredient_needed_id"]
            isOneToOne: false
            referencedRelation: "nasi_goreng_ingredient"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "FK_nasi_goreng_ingredient_recipe_nasi_goreng_ingredient_result~"
            columns: ["result_id"]
            isOneToOne: false
            referencedRelation: "nasi_goreng_ingredient"
            referencedColumns: ["id"]
          }
        ]
      }
      nasi_goreng_ingredient_tool: {
        Row: {
          id: string
          result_id: string
          tool_id: string
        }
        Insert: {
          id: string
          result_id: string
          tool_id: string
        }
        Update: {
          id?: string
          result_id?: string
          tool_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "FK_nasi_goreng_ingredient_tool_nasi_goreng_ingredient_result_id"
            columns: ["result_id"]
            isOneToOne: false
            referencedRelation: "nasi_goreng_ingredient"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "FK_nasi_goreng_ingredient_tool_nasi_goreng_tool_tool_id"
            columns: ["tool_id"]
            isOneToOne: false
            referencedRelation: "nasi_goreng_tool"
            referencedColumns: ["id"]
          }
        ]
      }
      nasi_goreng_plate: {
        Row: {
          id: string
          image: string
        }
        Insert: {
          id: string
          image: string
        }
        Update: {
          id?: string
          image?: string
        }
        Relationships: []
      }
      nasi_goreng_relic: {
        Row: {
          id: string
          image: string
          name: string
          tool_id: string
        }
        Insert: {
          id: string
          image: string
          name: string
          tool_id: string
        }
        Update: {
          id?: string
          image?: string
          name?: string
          tool_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "FK_nasi_goreng_relic_nasi_goreng_tool_tool_id"
            columns: ["tool_id"]
            isOneToOne: false
            referencedRelation: "nasi_goreng_tool"
            referencedColumns: ["id"]
          }
        ]
      }
      nasi_goreng_tool: {
        Row: {
          id: string
          image: string
          long_description: string
          name: string
          price: number
          short_description: string
        }
        Insert: {
          id: string
          image: string
          long_description: string
          name: string
          price: number
          short_description: string
        }
        Update: {
          id?: string
          image?: string
          long_description?: string
          name?: string
          price?: number
          short_description?: string
        }
        Relationships: []
      }
      nasi_goreng_upgrade: {
        Row: {
          id: string
          image: string
          name: string
        }
        Insert: {
          id: string
          image: string
          name: string
        }
        Update: {
          id?: string
          image?: string
          name?: string
        }
        Relationships: []
      }
      pizza_frenzy_topping: {
        Row: {
          general_name: string
          id: string
          image: string
        }
        Insert: {
          general_name: string
          id: string
          image: string
        }
        Update: {
          general_name?: string
          id?: string
          image?: string
        }
        Relationships: []
      }
      pizza_frenzy_topping_upgrade: {
        Row: {
          description: string
          id: string
          level: number
          name: string
          price: number
          topping_id: string
        }
        Insert: {
          description: string
          id: string
          level: number
          name: string
          price: number
          topping_id: string
        }
        Update: {
          description?: string
          id?: string
          level?: number
          name?: string
          price?: number
          topping_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "FK_pizza_frenzy_topping_upgrade_pizza_frenzy_topping_topping_id"
            columns: ["topping_id"]
            isOneToOne: false
            referencedRelation: "pizza_frenzy_topping"
            referencedColumns: ["id"]
          }
        ]
      }
      the_sims_bustin_out_job: {
        Row: {
          career: string
          description: string
          id: string
          job: string
          level: number
          salary: number
        }
        Insert: {
          career: string
          description: string
          id: string
          job: string
          level: number
          salary: number
        }
        Update: {
          career?: string
          description?: string
          id?: string
          job?: string
          level?: number
          salary?: number
        }
        Relationships: []
      }
      the_sims_castaway_product: {
        Row: {
          bladder: number
          category: string
          description: string
          eaten_raw: boolean
          energy: number
          hunger: number
          id: string
          image: string
          name: string
        }
        Insert: {
          bladder: number
          category: string
          description: string
          eaten_raw: boolean
          energy: number
          hunger: number
          id: string
          image: string
          name: string
        }
        Update: {
          bladder?: number
          category?: string
          description?: string
          eaten_raw?: boolean
          energy?: number
          hunger?: number
          id?: string
          image?: string
          name?: string
        }
        Relationships: []
      }
      the_sims_two_pets_product: {
        Row: {
          bladder: number
          category: string
          description: string
          energy: number
          hunger: number
          id: string
          image: string
          name: string
          price: number
        }
        Insert: {
          bladder: number
          category: string
          description: string
          energy: number
          hunger: number
          id: string
          image: string
          name: string
          price: number
        }
        Update: {
          bladder?: number
          category?: string
          description?: string
          energy?: number
          hunger?: number
          id?: string
          image?: string
          name?: string
          price?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
