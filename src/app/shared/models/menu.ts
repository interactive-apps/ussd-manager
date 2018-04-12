export interface UssdMenu {
  id: string;
  title?: string;
  type: string;
  options?: {
    title: string;
    response: string;
    next_menu: string
  }[];
  previous_menu?: string;
  dataType?: string;
  data_name?: string;
  data_id?: string;
  submit_data?: boolean;
  data_element?: string;
  category_combo?: string;
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
