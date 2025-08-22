'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { Checkbox } from '~/components/ui/checkbox';
import { Input } from '~/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Textarea } from '../ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { ChevronDownIcon } from 'lucide-react';
import { Calendar } from '../ui/calendar';
import { useState } from 'react';
// import { useToast } from "~/hooks/use-toast"

// Zod validation schema
const addDesaSchema = z.object({
  desa: z.string().min(5, 'Title must be at least 5 characters long').max(200, 'Title must not exceed 200 characters'),
  start: z.string().min(5, 'Regex must be at least 5 characters long'),
  end: z.string().min(5, 'Jawaban must be at least 5 characters long'),
});

type AddDesaFormData = z.infer<typeof addDesaSchema>;

export default function AddDesaForm() {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const form = useForm<AddDesaFormData>({
    resolver: zodResolver(addDesaSchema),
    defaultValues: {
      desa: '',
      start: '',
      end: '',
    },
  });

  const onSubmit = async (data: AddDesaFormData) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log('Question data:', data);

      toast('Question has been added successfully.');

      form.reset();
    } catch (error) {
      toast('Failed to add question. Please try again.');
    }
  };

  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle>Form Desa</CardTitle>
        <CardDescription>Create a desa</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <FormField
              control={form.control}
              name='desa'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Desa *</FormLabel>
                  <FormControl>
                    <Textarea placeholder='Input nama desa' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='space-x-4 flex'>
              <FormField
                control={form.control}
                name='start'
                render={({ field }) => (
                  <FormItem className='flex-1'>
                    <FormLabel>Start Quiz *</FormLabel>
                    <FormControl>
                      <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger className='w-full' asChild>
                          <Button variant='outline' id='date-picker' className='w-full justify-between font-normal'>
                            {date ? date.toLocaleDateString() : 'Select date'}
                            <ChevronDownIcon />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className='w-auto overflow-hidden p-0' align='start'>
                          <Calendar
                            mode='single'
                            selected={date}
                            captionLayout='dropdown'
                            onSelect={(date) => {
                              setDate(date);
                              setOpen(false);
                            }}
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='end'
                render={({ field }) => (
                  <FormItem className='flex-1'>
                    <FormLabel>End Quiz *</FormLabel>
                    <FormControl>
                      <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                          <Button variant='outline' id='date-picker' className='w-full justify-between font-normal'>
                            {date ? date.toLocaleDateString() : 'Select date'}
                            <ChevronDownIcon />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className='w-auto overflow-hidden p-0' align='start'>
                          <Calendar
                            mode='single'
                            selected={date}
                            captionLayout='dropdown'
                            onSelect={(date) => {
                              setDate(date);
                              setOpen(false);
                            }}
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='end'
                render={({ field }) => (
                  <FormItem className='flex-1'>
                    <FormLabel>End Quiz 2 *</FormLabel>
                    <FormControl>
                      <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                          <Button variant='outline' id='date-picker' className='w-full justify-between font-normal'>
                            {date ? date.toLocaleDateString() : 'Select date'}
                            <ChevronDownIcon />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className='w-auto overflow-hidden p-0' align='start'>
                          <Calendar
                            mode='single'
                            selected={date}
                            captionLayout='dropdown'
                            onSelect={(date) => {
                              setDate(date);
                              setOpen(false);
                            }}
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='flex gap-4'>
              <Button type='submit' disabled={form.formState.isSubmitting} className='flex-1'>
                {form.formState.isSubmitting ? 'Adding Desa...' : 'Add Desa'}
              </Button>
              <Button type='button' variant='outline' onClick={() => form.reset()}>
                Reset
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
