import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button, Input, Label } from '@src/components';
import { useSignIn } from '@src/hooks';
import { ReqUserSignIn } from '@src/interfaces';

const schema = z.object({
  email: z.string().email('The email is incorrect.').min(1, {
    message: 'Enter the email.',
  }),
  password: z.string().min(1, {
    message: 'Enter the password.',
  }),
});

export const SignInForm: React.FC = (): JSX.Element => {
  const { get } = useSignIn();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ReqUserSignIn>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (payload: ReqUserSignIn) => {
    try {
      await get(payload);
      reset();
    } catch {
      return;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={'w-full mx-auto px-10'}>
      <div className="mb-5">
        <Label htmlFor="email">Your email</Label>
        {errors.email?.message && <p className="text-red-500">{errors.email?.message}</p>}
        <Input
          register={register}
          name="email"
          type="email"
          placeholder="name@flowbite.com"
          required
        />
      </div>
      <div className="mb-5">
        <Label htmlFor="password">Your password</Label>
        {errors.password?.message && <p className="text-red-500">{errors.password?.message}</p>}
        <Input
          register={register}
          type="password"
          name="password"
          placeholder="Enter yor password"
          required
        />
      </div>

      <Button type="submit">Enter to account</Button>
    </form>
  );
};
