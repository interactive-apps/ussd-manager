export interface UssdMenu {
  id: string;
  title?: string;
  type: string;
  options?: Array<UssdMenuOptions>;
  previous_menu?: string;
  dataType?: string;
  data_name?: string;
  data_id?: string;
  field_value_type?: string;
  field_short_name?: string;
  submit_data?: boolean;
  data_element?: string;
  dataSet?: string;
  category_combo?: string;
  tracked_entity_attribute?: string;
  tracked_entity_type?: string;
  program?: string;
  program_stage?: string;
  auth_key?: string;
  fail_message?: string;
  retry_message?: string;
  number_of_retries?: number;
  period_type?: string;
  use_for_year?: boolean;
  years_back?: number;
  maximum_value?: string;
  next_menu?: string;
}

export interface UssdMenuOptions {
  id: string;
  title: string;
  response: string | boolean;
  next_menu?: string;
  value?: string;
}
