import { Path, FieldValues, UseFormRegister } from "react-hook-form";
import { Form } from "react-bootstrap";
import React from "react";

type InpuProps<TFieldValue extends FieldValues> = {
  lable : string;
  name: Path<TFieldValue>;
  register :UseFormRegister<TFieldValue>;
  error ?: string;
  type  ?: string;
  onBlur ?:(e:React.FocusEvent<HTMLInputElement>)=> void;
  formText ?: string;
  success ?: string
};

const Input = <TFieldValue extends FieldValues>({
  lable,
  type = "text",
  name,
  register,
  error,
  onBlur,
  formText,
  success,
}: InpuProps<TFieldValue>) => {
  const onBlurHndler = (e:React.FocusEvent<HTMLInputElement>)=>{
    if(onBlur){
      onBlur(e)
      register(name).onBlur(e)
    }else{
      register(name).onBlur(e)
    }
  }
  return (
    <>
      <Form.Group className="mb-1">
        <Form.Label>{lable}</Form.Label>
        <Form.Control
          type={type}
          {...register(name)}
          onBlur={onBlurHndler}
          isInvalid={error ? true : false}
          isValid={success ? true : false}
        />
      </Form.Group>
      {
        error && (
        <div style={{color : "#d63384" ,  marginBottom : "10px"}}>{error}</div>
        )
      }
      {success &&(
        <div style={{color : "#198754" , marginBottom : "10px"}}>{success}</div>
      )}
      {formText && <Form.Text className="mb-10">{formText}</Form.Text>}
    </>
  );
};

export default Input;
