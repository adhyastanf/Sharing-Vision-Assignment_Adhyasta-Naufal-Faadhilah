import { type RouteConfig, route, index, prefix, layout } from '@react-router/dev/routes';

export default [
  ...prefix('', [
    layout('routes/layout.tsx', [
      index('routes/all-post.tsx'),
      route('add-new', 'routes/add-new-articles.tsx'),
      route('preview', 'routes/preview.tsx'),
      route('edit/:id', 'routes/edit-articles.tsx'),
    ]),
  ]),
] satisfies RouteConfig;
