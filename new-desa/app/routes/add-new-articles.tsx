import FormArticles from "~/components/form/form-articles";

export default function AddNewArticlesPage() {
  return (
    <div className='max-w-4xl mx-auto'>
      <div className='text-center mb-8'>
        <h1 className='text-3xl font-bold text-gray-900 mb-2'>Add New Articles</h1>
        <p className='text-gray-600'>Create a new blog article with title, content, and category</p>
      </div>
      <FormArticles type="create"/>
    </div>
  )
}
