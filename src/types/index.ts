export interface Error {
  isError: boolean;
  errorMessage: string;
}

export interface SearchCollaborator {
  id: string;
  name: string;
  tab_number: string;
  position: string;
  subdivision: string;
}

export interface ResponseSearchCollaborators extends Error {
  data: SearchCollaborator[];
}

export interface New {
  image: string;
  title: string;
  text: string;
  link: string;
}

export interface Contact {
  photo: string;
  fullname: string;
  position_name: string;
  email: string;
  phone: string;
  phone_mobile: string;
}

export interface ResponseData extends Error {
  data: {
    news: New[];
    contacts: Contact;
    link_corporate_competencies_mentor: string;
    link_file_program_training: string;
    link_program_training: string;
    link_additional_competencies: string;
    link_file_payments: string;
  };
}

export interface Entry {
  id: string;
  title: string;
}

export interface Poll {
  id: string;
  title: string;
  view: string;
  entries: Entry[];
  type: 'select' | 'text' | 'choice' | 'date' | 'link_to_database_object';
}

export interface Collaborator {
  middlename: string;
  firstname: string;
  lastname: string;
  tab_number: string;
  position: string;
  subdivision: string;
  phone?: string;
  sex?: 'w' | 'm' | '';
}

export interface ResponseForm extends Error {
  data: Poll[];
  person: Collaborator;
  collaborator: null;
}

export interface ResponseProfessions extends Error {
  data: {
    value: string;
    label: string;
  }[];
}

export interface ResponseFormResult extends Error {
  data: Poll[];
  person: Collaborator;
  collaborator: Collaborator;
  type: FormType;
  is_done: boolean;
}

export interface FormData {
  id: string;
  value: string;
}

export type FormType =
  | 'person_mentor'
  | 'person_training'
  | 'manager_mentor'
  | 'manager_training';
