export const categories = [
  { id: '1', name: 'All articles mentioning Apple from yesterday, sorted by popular publishers first' },
  { id: '2', name: 'All articles about Tesla from the last month, sorted by recent first' },
  { id: '3', name: 'Top business headlines in the US right now' },
  { id: '4', name: 'Top headlines from TechCrunch right now' },
  { id: '5', name: 'All articles published by the Wall Street Journal in the last 6 months, sorted by recent first' }
];

export const filterOptions = [
  { label: 'Show All', value: 'showAll' },
  { label: 'Show 10', value: 'show10' },
  { label: 'Show 20', value: 'show20' },
  { label: 'Show 50', value: 'show50' },
  { label: 'Show 100', value: 'show100' }
];

export const getEndpoint = (value: string): string => {
  switch (value) {
    case '1':
      return 'https://newsapi.org/v2/everything?q=apple&from=2024-03-25&to=2024-03-25&sortBy=popularity&apiKey=157526369f7f4408aec5ceb566f3309b';
    case '2':
      return 'https://newsapi.org/v2/everything?q=tesla&from=2024-02-26&sortBy=publishedAt&apiKey=157526369f7f4408aec5ceb566f3309b';
    case '3':
      return 'https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=157526369f7f4408aec5ceb566f3309b';
    case '4':
      return 'https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=157526369f7f4408aec5ceb566f3309b';
    case '5':
      return 'https://newsapi.org/v2/everything?domains=wsj.com&apiKey=157526369f7f4408aec5ceb566f3309b';

    default:
      return '';
  }
};
