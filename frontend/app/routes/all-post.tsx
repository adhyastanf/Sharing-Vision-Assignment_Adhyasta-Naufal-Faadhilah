import { Newspaper } from 'lucide-react';
import { columns } from '~/components/data-table/columns-article';
import { DataTable } from '~/components/data-table/data-table';
import { DataTableError } from '~/components/error/error-table';
import { DataTableSkeleton } from '~/components/loading/loading-table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
import { useArticles } from '~/hooks/use-query';

export default function AllPostPage() {
  const { data: articles, isLoading, error } = useArticles(9999, 0);

  const publishedArticles = articles?.posts.filter((a) => a.status === 'publish') ?? [];
  const draftArticles = articles?.posts.filter((a) => a.status === 'draft') ?? [];
  const trashedArticles = articles?.posts.filter((a) => a.status === 'trash') ?? [];

  const tabsContent = [
    {
      value: 'published',
      content: <DataTable columns={columns} data={publishedArticles} />,
    },
    {
      value: 'drafts',
      content: <DataTable columns={columns} data={draftArticles} />,
    },
    {
      value: 'trashed',
      content: <DataTable columns={columns} data={trashedArticles} />,
    },
  ];

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
            <TabList tabs={tabsContent} isLoading={isLoading} isError={error} />
          </CardContent>
        </Card>
      </Tabs>
    </div>
  );
}

interface TabListProps {
  tabs: { value: string; content: any }[];
  isLoading: boolean;
  isError: any;
}

function TabList({ tabs, isLoading, isError }: TabListProps) {
  if (isLoading) {
    return <DataTableSkeleton columns={3} rows={5} />;
  }
  if (isError) {
    return <DataTableError columns={3} />;
  }

  return (
    <>
      {tabs.map((tab, idx) => {
        return (
          <TabsContent value={tab.value} key={idx}>
            {tab.content}
          </TabsContent>
        );
      })}
    </>
  );
}
