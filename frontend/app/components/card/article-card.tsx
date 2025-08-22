import { BookOpen, Circle, Clock, MapPin } from 'lucide-react';
import { Badge } from '~/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import type { Article } from '~/types/articles';

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Card className={`hover:shadow-md transition-shadow`}>
      <CardHeader>
        <div className='flex items-start justify-between'>
          <div className='flex items-start gap-3'>
            <div className='space-y-2'>
              <CardTitle className='text-xl'>{article.title}</CardTitle>
              <p className='text-gray-600'>{article.content}</p>
            </div>
          </div>
          <div className='flex items-center gap-2'>
            <Badge variant='secondary'>Published</Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className='space-y-4'>
        <div className='flex items-center gap-4 text-sm text-gray-500'>
          <div className='flex items-center gap-1'>
            <BookOpen className='h-4 w-4' />
            {article.category}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
