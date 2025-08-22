'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Newspaper, Save } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { CATEGORY_OPTIONS } from '~/constants/data';
import { useCreateArticle, useUpdateArticle } from '~/hooks/use-query';
import { createArticleSchema, type CreateArticleFormData } from '~/lib/schema';
import type { Article, CreateArticleData, UpdateArticleData } from '~/types/articles';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';

interface FormArticlesProps {
  initialData?: UpdateArticleData & { id: number };
  type: 'create' | 'update';
}

export default function FormArticles({ initialData, type }: FormArticlesProps) {
  const { mutate: mutatePublish } = useCreateArticle();
  const { mutate: mutateUpdate } = useUpdateArticle();
  const form = useForm<CreateArticleFormData>({
    resolver: zodResolver(createArticleSchema),
    defaultValues: {
      title: initialData?.title ?? '',
      category: initialData?.category ?? '',
      content: initialData?.content ?? '',
      status: initialData?.status ?? 'draft',
    },
  });

  const onSubmit = async (data: CreateArticleData) => {
    if (type === 'create') {
      mutatePublish(data);
    } else if (type === 'update') {
      if (!initialData?.id) return;
      mutateUpdate({ id: initialData.id, data: data as Article });
    }
  };

  const handlePublish = () => {
    if (type === 'create') form.setValue('status', 'publish');
    form.handleSubmit(onSubmit)();
  };

  const handleDraft = () => {
    if (type === 'create') form.setValue('status', 'draft');
    form.handleSubmit(onSubmit)();
  };

  console.log(form.formState.isSubmitting);

  return (
    <Card className='w-full'>
      <CardHeader className='flex items-center'>
        <Newspaper className='h-5 w-5 text-blue-600' />
        <div>
          <CardTitle>{type === 'create' ? 'Create' : 'Edit'} Article Form</CardTitle>
          <CardDescription>{type === 'create' ? 'Create' : 'Edit'} an article</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className='space-y-6'>
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title *</FormLabel>
                  <FormControl>
                    <Input placeholder='Input title article' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='category'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category *</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className='w-full'>
                          <SelectValue placeholder='Select a category' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {CATEGORY_OPTIONS.map((item, idx) => {
                          return (
                            <SelectItem value={item.value} key={idx}>
                              {item.label}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='content'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content *</FormLabel>
                  <FormControl>
                    <Textarea placeholder='Write your article content here' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='flex gap-4'>
              {type === 'create' ? (
                <>
                  <Button type='button' disabled={form.formState.isSubmitting} onClick={handlePublish}>
                    {form.formState.isSubmitting ? 'Publishing' : 'Publish'}
                  </Button>
                  <Button type='button' variant='outline' onClick={handleDraft} className='flex items-center'>
                    <Save />
                    Save as Draft
                  </Button>
                </>
              ) : (
                <Button type='button' disabled={form.formState.isSubmitting} onClick={handlePublish}>
                  {form.formState.isSubmitting ? 'Updating' : 'Update'}
                </Button>
              )}
              <Button type='button' variant='destructive' onClick={() => form.reset()}>
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
