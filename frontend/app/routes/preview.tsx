import { useState, useMemo } from 'react';
import { BookOpen, Search } from 'lucide-react';
import { ArticleCard } from '~/components/card/article-card';
import { FilterSelect } from '~/components/filter-select';
import { Pagination } from '~/components/pagination';
import { SearchInput } from '~/components/search-input';
import { CATEGORY_OPTIONS } from '~/constants/data';
import { useArticles } from '~/hooks/use-query';
import type { Article } from '~/types/articles';
import { ArticlesListSkeleton } from '~/components/loading/loading-preview';

export default function PreviewPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const offset = (currentPage - 1) * itemsPerPage;

  const { data, isLoading, error } = useArticles(itemsPerPage, offset);

  const totalItems = data?.total_count ?? 0;

  return (
    <div className='max-w-4xl mx-auto'>
      <div className='text-center mb-8'>
        <h1 className='text-3xl font-bold text-gray-900 mb-2'>Preview</h1>
        <p className='text-gray-600'>View published articles as they appear to readers</p>
      </div>

      <ArticlesList
        isLoading={isLoading}
        isError={error}
        articles={data?.posts ?? []}
        totalItems={totalItems}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        setCurrentPage={setCurrentPage}
        setItemsPerPage={setItemsPerPage}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
      />
    </div>
  );
}

interface ArticlesListProps {
  articles: Article[];
  isLoading: boolean;
  isError: any;
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
  setCurrentPage: (page: number) => void;
  setItemsPerPage: (items: number) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  categoryFilter: string;
  setCategoryFilter: (category: string) => void;
}

function ArticlesList({ articles, isLoading, isError, totalItems, currentPage, itemsPerPage, setCurrentPage, setItemsPerPage, searchTerm, setSearchTerm, categoryFilter, setCategoryFilter }: ArticlesListProps) {
  if (isLoading) {
    return <ArticlesListSkeleton />;
  }

  if (isError) {
    return <div className='text-center py-12 text-red-500'>Failed to load articles. Please try again.</div>;
  }
  const publishedArticles = useMemo(
    () =>
      articles.filter(
        (a) =>
          a.status === 'publish' && (categoryFilter === 'all' || a.category === categoryFilter) && (searchTerm === '' || a.title.toLowerCase().includes(searchTerm.toLowerCase()) || a.content.toLowerCase().includes(searchTerm.toLowerCase()))
      ),
    [articles, categoryFilter, searchTerm]
  );

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (articles.length === 0) {
    return (
      <div className='text-center py-12'>
        <BookOpen className='mx-auto h-12 w-12 text-gray-400 mb-4' />
        <h3 className='text-lg font-medium text-gray-900 mb-2'>No articles yet</h3>
        <p className='text-gray-500'>Create your first article to see it here.</p>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      <div className='space-y-4'>
        <div className='flex items-center justify-between'>
          <h2 className='text-2xl font-bold text-gray-900'>Articles ({publishedArticles.length})</h2>
        </div>

        <div className='flex flex-col sm:flex-row gap-4'>
          <SearchInput value={searchTerm} onChange={setSearchTerm} placeholder='Search articles...' className='flex-1' />
          <FilterSelect value={categoryFilter} onChange={(value) => setCategoryFilter(value)} options={CATEGORY_OPTIONS} placeholder='Category' allLabel='All Categories' className='w-40' />
        </div>
      </div>

      {publishedArticles.length === 0 ? (
        <div className='text-center py-12'>
          <Search className='mx-auto h-12 w-12 text-gray-400 mb-4' />
          <h3 className='text-lg font-medium text-gray-900 mb-2'>No articles found</h3>
          <p className='text-gray-500'>Try adjusting your search or filters.</p>
        </div>
      ) : (
        <>
          <div className='grid gap-6'>
            {publishedArticles.map((article, idx) => (
              <ArticleCard key={idx} article={article} />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
            totalItems={totalItems}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={(items) => {
              setItemsPerPage(items);
              setCurrentPage(1);
            }}
          />
        </>
      )}
    </div>
  );
}
