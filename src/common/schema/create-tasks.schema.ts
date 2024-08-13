import * as Yup from "yup";

export default class TasksSchema {
  schema;

  initialValues;

  constructor() {
    this.schema = Yup.object({
      title: Yup.string().required("title is required"),
      description: Yup.string(),
      completed: Yup.mixed(),
    });

    this.initialValues = {
      title: "",
      description: "",
      completed: false,
    };
  }
}
