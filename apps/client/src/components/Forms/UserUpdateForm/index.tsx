import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button, Input, Label, Select } from '@src/components';
import { ConstantInterval, IntervalArr, ReqUpdateUser } from '@src/interfaces';
import { useSessionStore } from '@src/store';
import { useUserUpdate } from '@src/hooks';

const schema = z.object({
  username: z
    .string()
    .min(1, { message: 'Enter the username.' })
    .max(20)
    .refine(value => /^[a-zA-Z0-9_ ]+?[a-zA-Z0-9_ ]+$/.test(value), 'should contain only alphabet')
    .optional()
    .or(z.literal('')),

  coinNames: z.string().min(1, { message: 'Enter the coin name.' }).optional().or(z.literal('')),

  upperPrice: z
    .number()
    .finite('The min price should be 0 or more.')
    .nonnegative('Enter the value of the min price.')
    .optional()
    .or(z.literal(-1)),

  middlePrice: z
    .number()
    .finite('The min price should be 0 or more.')
    .nonnegative('Enter the value of the min price.')
    .optional()
    .or(z.literal(-1)),

  lowerPrice: z
    .number()
    .finite('The min price should be 0 or more.')
    .nonnegative('Enter the value of the min price.')
    .optional()
    .or(z.literal(-1)),

  interval: z
    .nativeEnum(ConstantInterval, {
      errorMap: () => ({ message: 'Please select your interval' }),
    })
    .optional()
    .or(z.literal('')),
});

export const UpdateUserForm: React.FC = (): JSX.Element => {
  const {
    session: { user },
  } = useSessionStore();
  const { update } = useUserUpdate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<ReqUpdateUser>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (user.coinOptions.interval) setValue('interval', user.coinOptions.interval);
  }, [user.coinOptions]);

  const onSubmit = async (payload: ReqUpdateUser) => {
    try {
      const res: ReqUpdateUser = {};
      if (payload.username) res.username = payload.username;
      if (payload.coinNames) res.coinNames = payload.coinNames;
      if (payload.upperPrice) res.upperPrice = payload.upperPrice;
      if (payload.middlePrice) res.middlePrice = payload.middlePrice;
      if (payload.lowerPrice) res.lowerPrice = payload.lowerPrice;
      if (payload.interval) res.interval = payload.interval;

      await update(res);
      reset();
      if (payload.interval) setValue('interval', payload.interval);
    } catch {
      return;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={'w-full mx-auto px-10'}>
      <div className="mb-5">
        <Label htmlFor="username">Your username</Label>
        {errors.username?.message && <p className="text-red-500">{errors.username?.message}</p>}
        <Input register={register} name="username" type="text" placeholder="Enter user name" />
      </div>
      <div className="mb-5">
        <Label htmlFor="coinNames">Your coinNames</Label>
        {errors.coinNames?.message && <p className="text-red-500">{errors.coinNames?.message}</p>}
        <Input register={register} type="text" name="coinNames" placeholder="Enter coin name" />
      </div>
      <div className="mb-5">
        {errors.interval?.message && <p className="text-red-500">{errors.interval?.message}</p>}
        <Select
          register={register}
          name={'interval'}
          keyName="interval"
          label={'Interval'}
          data={IntervalArr}
          setValue={setValue}
        />
      </div>

      <Button type="submit">Set new options</Button>
    </form>
  );
};
