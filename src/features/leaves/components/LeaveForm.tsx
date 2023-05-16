import { type SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { capitalize } from 'lodash';
import Datepicker from 'react-tailwindcss-datepicker';
import { type DateValueType } from 'react-tailwindcss-datepicker/dist/types';
import {
  type AddLeaveInput,
  type LeaveDetails,
  type UpdateLeaveInput,
} from '../types';
import * as validators from '../helpers/validators';

export type LeaveFormProps =
  | {
      kind: 'create';
      onSubmit: SubmitHandler<AddLeaveInput>;
    }
  | {
      kind: 'edit';
      leave: LeaveDetails;
      onSubmit: SubmitHandler<UpdateLeaveInput['data']>;
    };

const LeaveForm = (props: LeaveFormProps) => {
  const { kind, onSubmit } = props;
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isValid },
  } = useForm<
    typeof onSubmit extends SubmitHandler<AddLeaveInput>
      ? AddLeaveInput
      : UpdateLeaveInput['data']
  >({
    mode: 'onBlur',
    resolver: zodResolver(
      kind === 'create' ? validators.add : validators.updateForm,
    ),
    defaultValues: kind === 'edit' ? props.leave : undefined,
  });

  const currentLeaveDate = getValues('leaveDate');
  const currentLeaveDateRange = {
    startDate: currentLeaveDate,
    endDate: currentLeaveDate,
  };

  const handleValueChange = (value: DateValueType) => {
    if (value?.startDate) {
      setValue('leaveDate', new Date(value.startDate).toISOString(), {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    }
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      <h1>{capitalize(kind)}</h1>
      <label>Leave Date</label>
      <Datepicker
        value={currentLeaveDateRange}
        onChange={handleValueChange}
        useRange={false}
        asSingle={true}
      />
      <label htmlFor="reason">Reason</label>
      <textarea id="reason" cols={3} {...register('reason')}></textarea>
      {errors.reason && <div>{errors.reason.message}</div>}
      <button type="submit" disabled={!isValid}>
        {capitalize(kind)}
      </button>
    </form>
  );
};

export default LeaveForm;
