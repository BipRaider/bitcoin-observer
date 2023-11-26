import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button, Label, Input } from '@src/components';
import { ReqUserSignUp } from '@src/interfaces';
import { useSignUp } from '@src/hooks';
import { useToggleStore } from '@src/store';

const schema = z.object({
  email: z.string().email('The email is incorrect.').min(1, {
    message: 'Enter the email.',
  }),
  password: z.string().min(1, {
    message: 'Enter the password.',
  }),
  username: z
    .string()
    .min(1, {
      message: 'Enter the username.',
    })
    .max(20)
    .refine(value => /^[a-zA-Z0-9_ ]+?[a-zA-Z0-9_ ]+$/.test(value), 'should contain only alphabet'),
});

export const SignUpForm: React.FC = (): JSX.Element => {
  const { data, create } = useSignUp();
  const { setSingInToggle } = useToggleStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ReqUserSignUp>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (payload: ReqUserSignUp) => {
    await create(payload);
    if (data) setSingInToggle.on;
    else setSingInToggle.off;
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={'w-full mx-auto px-10'}>
      <div className="mb-5">
        <Label htmlFor="username">Your name</Label>
        {errors.username?.message && <p className="text-red-500">{errors.username?.message}</p>}
        <Input register={register} type="text" name="username" placeholder="UserName" required />
      </div>

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

      <Button type="submit">Register new account</Button>
    </form>
  );
};
