export interface Setting {
  id: string;
  name: string;
  description?: string;
  session_key?: string;
  provider_key?: string;
  user_response?: string;
  phone_number_key?: string;
  starting_menu?: string;
  no_user_message?: string;
  dataStoreKey?: string;
  request_type?: {
    key: string;
    first_request: string;
    Continue_request: string;
    terminated_by_provider: string;
    timed_out: string;
  };
}
