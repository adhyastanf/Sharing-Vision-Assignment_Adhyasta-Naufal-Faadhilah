import { Newspaper } from 'lucide-react';
import { columns } from '~/components/data-table/columns-article';
import { DataTable } from '~/components/data-table/data-table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
import { useArticles } from '~/hooks/use-query';

export default function AllPostPage() {
  const { data: articles, isLoading } = useArticles(9999, 0);

  if (isLoading) {
    return;
  }

  const publishedArticles = articles?.posts.filter((a) => a.status === 'publish') ?? [];
  const draftArticles = articles?.posts.filter((a) => a.status === 'draft') ?? [];
  const trashedArticles = articles?.posts.filter((a) => a.status === 'trash') ?? [];

  return (
    <div className='max-w-4xl mx-auto'>
      <div className='text-center mb-8'>
        <h1 className='text-3xl font-bold text-gray-900 mb-2'>Manage Articles</h1>
        <p className='text-gray-600'>View, edit, and organize your articles easily</p>
      </div>
      <Tabs defaultValue='published'>
        <TabsList className='w-full'>
          <TabsTrigger value='published'>Published</TabsTrigger>
          <TabsTrigger value='drafts'>Drafts</TabsTrigger>
          <TabsTrigger value='trashed'>Trashed</TabsTrigger>
        </TabsList>
        <TabsContent value='published'>
          <Card>
            <CardHeader>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                  <Newspaper className='h-5 w-5 text-blue-600' />
                  <div>
                    <CardTitle>Articles Management</CardTitle>
                    <CardDescription>Manage articles and their availability</CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                <DataTable columns={columns} data={publishedArticles} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value='drafts'>
          <Card>
            <CardHeader>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                  <Newspaper className='h-5 w-5 text-blue-600' />
                  <div>
                    <CardTitle>Articles Management</CardTitle>
                    <CardDescription>Manage articles and their availability</CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                <DataTable columns={columns} data={draftArticles} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value='trashed'>
          <Card>
            <CardHeader>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                  <Newspaper className='h-5 w-5 text-blue-600' />
                  <div>
                    <CardTitle>Articles Management</CardTitle>
                    <CardDescription>Manage articles and their availability</CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                <DataTable columns={columns} data={trashedArticles} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
