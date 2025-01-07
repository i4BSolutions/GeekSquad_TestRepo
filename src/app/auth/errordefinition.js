import {z} from 'zod';

export const signUpFormSchema = z.object({
    email: z.string().email({message: 'Please enter a valid email address'}).trim(),
    password: z.string().min(6,{message: 'Password must be at least 6 characters long'}),
    confirmPassword: z.string().min(6,{message: 'Password must be at least 6 characters long'})
    

}).refine((data)=> data.password === data.confirmPassword,
{message:"Password does not match",path:['confirmPassword']});

export const loginFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z.string().min(1, { message: "Password field must not be empty." }),
});