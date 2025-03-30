import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "@/lib/themeUtils";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Share2, Bookmark } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// Post types: image, video, text
type PostType = "image" | "video" | "text";

interface Post {
  id: number;
  type: PostType;
  content: string;
  author: string;
  authorAvatar: string;
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
  saved: boolean;
  mediaUrl?: string;
}

const samplePosts: Post[] = [
  {
    id: 1,
    type: "image",
    content: "Our latest brand campaign for Tech Innovations has increased their online engagement by 300%!",
    author: "QuickAdd Marketing",
    authorAvatar: "QA",
    timestamp: "2 hours ago",
    likes: 243,
    comments: 42,
    shares: 18,
    saved: false,
    mediaUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80"
  },
  {
    id: 2,
    type: "video",
    content: "Behind the scenes look at our creative team brainstorming for the upcoming season's ad campaigns",
    author: "QuickAdd Creative",
    authorAvatar: "QC",
    timestamp: "1 day ago",
    likes: 567,
    comments: 89,
    shares: 76,
    saved: true,
    mediaUrl: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80"
  },
  {
    id: 3,
    type: "text",
    content: "Breaking: Our client's television ad just won the National Advertising Award for Most Innovative Campaign! Proud of our team's exceptional work that's redefining standards in the industry.",
    author: "QuickAdd CEO",
    authorAvatar: "CEO",
    timestamp: "3 days ago",
    likes: 892,
    comments: 167,
    shares: 245,
    saved: false
  },
  {
    id: 4,
    type: "image",
    content: "Digital billboard designs for Downtown Shopping District's summer campaign. Elegant, eye-catching, and effective!",
    author: "QuickAdd Design",
    authorAvatar: "QD",
    timestamp: "1 week ago",
    likes: 432,
    comments: 53,
    shares: 29,
    saved: false,
    mediaUrl: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&q=80"
  }
];

const SocialMediaFeed = () => {
  const [posts, setPosts] = useState<Post[]>(samplePosts);
  const feedRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.likes + 1 } 
        : post
    ));
  };

  const handleSave = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, saved: !post.saved } 
        : post
    ));
  };

  useEffect(() => {
    if (!feedRef.current) return;

    // Animate posts as they enter the viewport
    gsap.utils.toArray<HTMLElement>('.social-post').forEach((post, i) => {
      gsap.fromTo(post, 
        { 
          y: 50, 
          opacity: 0,
          scale: 0.95
        },
        { 
          y: 0, 
          opacity: 1,
          scale: 1,
          duration: 0.7,
          ease: "power2.out",
          delay: i * 0.15,
          scrollTrigger: {
            trigger: post,
            start: "top bottom-=100",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // Create a hover effect for each post
    gsap.utils.toArray<HTMLElement>('.social-post').forEach((post) => {
      post.addEventListener('mouseenter', () => {
        gsap.to(post, { 
          y: -5, 
          boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
          duration: 0.3,
          ease: "power2.out"
        });
      });
      
      post.addEventListener('mouseleave', () => {
        gsap.to(post, { 
          y: 0, 
          boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
          duration: 0.3,
          ease: "power2.in"
        });
      });
    });

    return () => {
      // Clean up animations
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, [posts]);

  return (
    <div 
      ref={feedRef}
      className="w-full max-w-2xl mx-auto py-12 space-y-6"
    >
      <h2 className="text-2xl font-bold mb-8 border-b pb-4">Social Feed & Ad Campaigns</h2>
      
      {posts.map((post) => (
        <div 
          key={post.id}
          className={`social-post rounded-lg p-6 transition-all duration-300 ${
            theme === 'dark' 
              ? 'bg-gray-900 border border-gray-800' 
              : 'bg-white border border-gray-200'
          }`}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
              {post.authorAvatar}
            </div>
            <div>
              <h3 className="font-semibold">{post.author}</h3>
              <p className="text-gray-500 text-sm">{post.timestamp}</p>
            </div>
          </div>
          
          <p className="mb-4 text-lg">{post.content}</p>
          
          {post.mediaUrl && (
            <div className="mb-4 rounded-lg overflow-hidden relative">
              {post.type === 'video' ? (
                <div className="relative aspect-video bg-black">
                  <img 
                    src={post.mediaUrl} 
                    alt={post.content}
                    className="w-full h-full object-cover opacity-90"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-primary/80 flex items-center justify-center cursor-pointer hover:bg-primary transition-colors">
                      <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-white border-b-8 border-b-transparent ml-1"></div>
                    </div>
                  </div>
                </div>
              ) : (
                <img 
                  src={post.mediaUrl} 
                  alt={post.content}
                  className="w-full rounded-lg"
                />
              )}
            </div>
          )}
          
          <div className="flex justify-between items-center pt-3 border-t">
            <div className="flex gap-6">
              <button 
                onClick={() => handleLike(post.id)}
                className="flex items-center gap-1 text-gray-500 hover:text-red-500 transition-colors"
              >
                <Heart className="w-5 h-5" />
                <span>{post.likes}</span>
              </button>
              
              <button className="flex items-center gap-1 text-gray-500 hover:text-blue-500 transition-colors">
                <MessageCircle className="w-5 h-5" />
                <span>{post.comments}</span>
              </button>
              
              <button className="flex items-center gap-1 text-gray-500 hover:text-green-500 transition-colors">
                <Share2 className="w-5 h-5" />
                <span>{post.shares}</span>
              </button>
            </div>
            
            <button 
              onClick={() => handleSave(post.id)}
              className={`${
                post.saved ? 'text-amber-500' : 'text-gray-500'
              } hover:text-amber-500 transition-colors`}
            >
              <Bookmark className="w-5 h-5" />
            </button>
          </div>
        </div>
      ))}
      
      <div className="text-center pt-4">
        <Button variant="outline" className="mx-auto">
          Load More Stories
        </Button>
      </div>
    </div>
  );
};

export default SocialMediaFeed;