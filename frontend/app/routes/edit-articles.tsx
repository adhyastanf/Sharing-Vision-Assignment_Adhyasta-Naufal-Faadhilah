import { useParams } from "react-router";
import FormArticles from "~/components/form/form-articles";
import { useArticle } from "~/hooks/use-query";

export default function EditArticlesPage() {
  const params = useParams()
  const id = Number(params?.id);
  const { data: article, isLoading, error } = useArticle(id);

  if (isLoading) return
  if (!article) return <p>Invalid article ID</p>;
  if (error) return <p>Failed to load article</p>;

  return (
    <div className='max-w-4xl mx-auto'>
      <div className='text-center mb-8'>
        <h1 className='text-3xl font-bold text-gray-900 mb-2'>Edit Articles</h1>
        <p className='text-gray-600'>Edit a blog article with title, content, and category</p>
      </div>
      <FormArticles initialData={article} type="update" />
    </div>
  )
}
