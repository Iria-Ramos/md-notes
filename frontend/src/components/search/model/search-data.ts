import { getCollection } from 'astro:content';
import type { SearchableContent } from './types.js';

export function transformCollectionToSearchable(
  collection: any[],
  category: 'posts'
): SearchableContent[] {
  return collection.map((item, index) => {    
    return {
      id: item.id || `${category}-${index}`,
      title: item.data?.title || 'Untitled',
      content: item.data.content || '',
      tags: item.data?.tags || [],
    };
  });
}

export async function getAllSearchData(): Promise<SearchableContent[]> {
  try {
    // TODO: Change this to a sever callback
    const [posts] = await Promise.all([
      getCollection('posts').catch(() => []),
    ]);

    const searchData = [
      ...transformCollectionToSearchable(posts, 'posts'),
    ];

    return searchData;
  } catch (error) {
    console.error('Error loading search data:', error);
    return [];
  }
}