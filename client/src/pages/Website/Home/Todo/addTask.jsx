import { useFormik } from "formik";
import { FiSave } from "react-icons/fi";
import CustomInput from "../../../../components/ui/custom-inputs/CustomInput";
import CustomTextarea from "../../../../components/ui/custom-inputs/CustomTextarea";
import Label from "../../../../components/ui/custom-inputs/Label";
import ErrorFormik from "../../../../components/ui/ErrorFormik";
import FilledButton from "../../../../components/ui/buttons/FilledButton";
import { useTransition, animated } from "react-spring";
import { useEffect, useState } from "react";
import { addTaskSchema } from "../../../../utils/forms-schemas";

const AddTask = ({ onSave, onCancel }) => {
  const [showForm, setShowForm] = useState(false);

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    setFieldValue,
    values,
    isValid,
    errors,
    touched,
  } = useFormik({
    initialValues: {
      subject: "",
      task: "",
      priority: "",
      status: "",
    },
    validationSchema: addTaskSchema,
    onSubmit: (values) => {
      onSave(values);
    },
  });

  const transitions = useTransition(showForm, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: 400 },
  });

  useEffect(() => {
    setShowForm(true);
  }, []);

  return transitions(
    (styles, item) =>
      item && (
        <animated.div
          style={styles}
          className='fixed inset-0 z-50 flex items-center justify-center'
        >
          <div className='absolute inset-0 bg-gray-900 bg-opacity-50'></div>
          <div className='relative z-10 w-full max-w-md rounded-xl bg-white p-4 text-black shadow-lg'>
            <h3 className='mb-4 text-xl font-semibold'>Add Task</h3>
            <form onSubmit={handleSubmit}>
              <div className='mb-4'>
                <Label text='Subject' />
                <CustomInput
                  type='text'
                  name='subject'
                  value={values?.subject}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className='w-full'
                  withFocus={true}
                  shape={3}
                />
                <ErrorFormik
                  isError={errors?.subject}
                  error={errors?.subject}
                  isTouched={touched?.subject}
                />
              </div>
              <div className='mb-4'>
                <Label text='Task' />
                <CustomTextarea
                  className='my-custom-class'
                  placeholder='Enter your text here'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isRequired={true}
                  name='task'
                  id='customTextarea'
                  value={values?.task}
                  withFocus={true}
                  isDisable={false}
                  shape={3}
                />
                <ErrorFormik
                  isError={errors?.task}
                  error={errors?.task}
                  isTouched={touched?.task}
                />
              </div>
              <div className='mb-4'>
                <Label text='Priority' />
                <select
                  name='priority'
                  value={values?.priority}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className='w-full rounded-md border p-2'
                >
                  <option value='' disabled>
                    Select Priority
                  </option>
                  <option value='high'>High</option>
                  <option value='medium'>Medium</option>
                  <option value='low'>Low</option>
                </select>
                <ErrorFormik
                  isError={errors?.priority}
                  error={errors?.priority}
                  isTouched={touched?.priority}
                />
              </div>
              <div className='mb-4'>
                <Label text='Status' />
                <select
                  name='status'
                  value={values?.status}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className='w-full rounded-md border p-2'
                >
                  <option value='' disabled>
                    Select Status
                  </option>
                  <option value='In progress'>In Progress</option>
                  <option value='completed'>Completed</option>
                  <option value='Deferred'>Deferred</option>
                  <option value='open'>Open</option>
                </select>
                <ErrorFormik
                  isError={errors?.status}
                  error={errors?.status}
                  isTouched={touched?.status}
                />
              </div>

              <div className='mb-4'>
                <button
                  type='button'
                  onClick={onCancel}
                  className='mr-2 text-red-500'
                >
                  Cancel
                </button>
                <FilledButton
                  text='Save'
                  isButton={true}
                  icon={
                    <div className='m-1'>
                      <FiSave />
                    </div>
                  }
                  buttonType='submit'
                  className='cursor-pointer rounded-md bg-green-500 px-4 py-2 text-white'
                  width='w-20'
                  isDisable={!isValid}
                />
              </div>
            </form>
          </div>
        </animated.div>
      ),
  );
};

export default AddTask;
