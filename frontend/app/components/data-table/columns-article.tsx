import type { ColumnDef } from '@tanstack/react-table';
import { Button } from '../ui/button';
import { Edit, Power, Trash2 } from 'lucide-react';
import { Badge } from '../ui/badge';
import type { Article } from '~/types/articles';
import { useDeleteArticle } from '~/hooks/use-query';
import { Link } from 'react-router';

export const columns: ColumnDef<Article>[] = [
  {
    accessorKey: 'title',
    header: 'Title',
  },
  {
    accessorKey: 'category',
    header: 'Category',
  },
  {
    accessorKey: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const article = row.original;
      const { mutate } = useDeleteArticle();

      return (
        <div className='flex items-center gap-1'>
          <Button variant='ghost' size='sm' className='h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600'>
            <Link to={`/edit/${article.id}`}>
              <Edit className='h-4 w-4' />
            </Link>
          </Button>
          <Button onClick={() => mutate(article.id)} variant='ghost' size='sm' className='h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600'>
            <Trash2 className='h-4 w-4' />
          </Button>
        </div>
      );
    },
  },
];
