import * as Yup from "yup";

export default class RegisterSchema {
  schema;

  initialValues;

  constructor() {
    this.schema = Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters long")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm Password is required"),
    });

    this.initialValues = {
      email: "",
      password: "",
      confirmPassword: "",
    };
  }
}
