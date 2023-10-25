import { Formik, Form, Field, ErrorMessage } from 'formik';
 import * as yup from 'yup';
 
  const initialValues = {
    name: '',
    number: '',
  }

const schema = yup.object().shape({
  name: yup.string().min(3).required(),
  number: yup.number().required(),
  })

export const ContactForm = ({handleAddContact}) => {
 const handleSubmit = (values, {resetForm}) => {
   handleAddContact(values)
  resetForm();
   }
  
    return (
      <div>
        <Formik initialValues={initialValues} validationSchema={schema} onSubmit={handleSubmit}>
        <Form action="submit">
          <label htmlFor="">
            <p>Name</p>
            <Field
              type="text"
                name="name"
                placeholder="Bob Pummer"
              />
              <ErrorMessage name="name" render={msg => <div>{msg}</div>} />
          </label>
          <label htmlFor="">
            <p>Number</p>
            <Field
              type="tel"
                name="number"
                placeholder="06844673287"
              />
              <ErrorMessage name="number" render={msg => <div>{msg}</div>}/>
          </label>
          <button type="submit">Add contact</button>
          </Form>
          </Formik>
      </div>
    );
  }

