
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PodcastPlayer from '@/components/ui/PodcastPlayer';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const podcastsData = [
  {
    id: '1',
    title: 'Understanding Market Volatility',
    description: 'Expert analysis on how to navigate volatile markets and maintain a balanced portfolio during times of uncertainty.',
    imageUrl: 'https://images.unsplash.com/photo-1611605698335-8b1569810432?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    duration: '32 min',
    date: 'May 15, 2023',
    audioUrl: 'https://example.com/podcast1.mp3',
    category: 'Investing',
  },
  {
    id: '2',
    title: 'The Future of Digital Banking',
    description: 'Exploring how fintech innovations are reshaping traditional banking and what this means for consumers and investors.',
    imageUrl: 'https://images.unsplash.com/photo-1591696205602-2f950c417cb9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    duration: '45 min',
    date: 'Jun 3, 2023',
    audioUrl: 'https://example.com/podcast2.mp3',
    category: 'Technology',
  },
  {
    id: '3',
    title: 'Retirement Planning Essentials',
    description: 'Key strategies for effective retirement planning at any age, with guidance on maximizing your savings and investments.',
    imageUrl: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    duration: '28 min',
    date: 'Jun 20, 2023',
    audioUrl: 'https://example.com/podcast3.mp3',
    category: 'Planning',
  },
  {
    id: '4',
    title: 'Global Economic Trends',
    description: 'Analysis of current global economic indicators and their potential impact on various markets and investment strategies.',
    imageUrl: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    duration: '52 min',
    date: 'Jul 8, 2023',
    audioUrl: 'https://example.com/podcast4.mp3',
    category: 'Economy',
  },
  {
    id: '5',
    title: 'Tax Optimization Strategies',
    description: 'Expert advice on legal tax optimization approaches for individuals and small businesses to maximize after-tax returns.',
    imageUrl: 'https://images.unsplash.com/photo-1586486855514-8c737958e1a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    duration: '36 min',
    date: 'Jul 25, 2023',
    audioUrl: 'https://example.com/podcast5.mp3',
    category: 'Planning',
  },
  {
    id: '6',
    title: 'Cryptocurrency Investment Guide',
    description: 'A comprehensive look at cryptocurrency investing, blockchain technology, and how to integrate digital assets into your portfolio.',
    imageUrl: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    duration: '42 min',
    date: 'Aug 12, 2023',
    audioUrl: 'https://example.com/podcast6.mp3',
    category: 'Technology',
  },
];

const Podcast = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [activeCategory, setActiveCategory] = React.useState('all');

  const filteredPodcasts = podcastsData.filter((podcast) => {
    const matchesSearch = podcast.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         podcast.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || podcast.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...Array.from(new Set(podcastsData.map(podcast => podcast.category)))];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        {/* Header */}
        <section className="bg-muted/30 py-12">
          <div className="container px-4 mx-auto">
            <div className="max-w-2xl">
              <h1 className="text-4xl font-bold mb-4">Financial Podcasts</h1>
              <p className="text-lg text-muted-foreground">
                Listen to expert discussions on finance, markets, and investment strategies.
              </p>
            </div>
          </div>
        </section>
        
        {/* Search and Filters */}
        <section className="py-8 border-b">
          <div className="container px-4 mx-auto">
            <div className="flex flex-col space-y-4">
              <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search podcasts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Tabs value={activeCategory} onValueChange={setActiveCategory}>
                <TabsList>
                  {categories.map((category) => (
                    <TabsTrigger key={category} value={category} className="capitalize">
                      {category}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
          </div>
        </section>
        
        {/* Podcasts List */}
        <section className="py-12">
          <div className="container px-4 mx-auto">
            {filteredPodcasts.length > 0 ? (
              <div className="space-y-6">
                {filteredPodcasts.map((podcast) => (
                  <PodcastPlayer
                    key={podcast.id}
                    id={podcast.id}
                    title={podcast.title}
                    description={podcast.description}
                    imageUrl={podcast.imageUrl}
                    duration={podcast.duration}
                    date={podcast.date}
                    audioUrl={podcast.audioUrl}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <h3 className="text-xl font-medium mb-2">No podcasts found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or category filter
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Podcast;
