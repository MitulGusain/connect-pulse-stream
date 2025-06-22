
import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Heart, User, Users, MessageSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface User {
  id: number;
  name: string;
  username: string;
  bio: string;
  avatar: string;
}

interface Post {
  id: number;
  user: User;
  content: string;
  image?: string;
  likes: number;
  timestamp: string;
}

const Index = () => {
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      user: {
        id: 1,
        name: "Alice Johnson",
        username: "@alice_j",
        bio: "Designer & Coffee Enthusiast",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
      },
      content: "Just launched my new design portfolio! Excited to share my latest work with everyone. 🎨✨",
      likes: 23,
      timestamp: "2 hours ago"
    },
    {
      id: 2,
      user: {
        id: 2,
        name: "Marcus Chen",
        username: "@marcus_dev",
        bio: "Full-stack Developer",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
      },
      content: "Working on a new React project and loving the developer experience. The component composition is so elegant!",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500&h=300&fit=crop",
      likes: 41,
      timestamp: "4 hours ago"
    }
  ]);
  const [newPost, setNewPost] = useState('');
  const [showLogin, setShowLogin] = useState(true);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [signupForm, setSignupForm] = useState({ name: '', email: '', password: '', bio: '' });

  const handleLogin = () => {
    if (loginForm.email && loginForm.password) {
      const user: User = {
        id: 3,
        name: "John Doe",
        username: "@john_doe",
        bio: "Social media enthusiast",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face"
      };
      setCurrentUser(user);
      setIsAuthenticated(true);
      toast({
        title: "Welcome back!",
        description: "Successfully logged in to your account.",
      });
    }
  };

  const handleSignup = () => {
    if (signupForm.name && signupForm.email && signupForm.password) {
      const user: User = {
        id: 4,
        name: signupForm.name,
        username: `@${signupForm.name.toLowerCase().replace(' ', '_')}`,
        bio: signupForm.bio || "New to the platform",
        avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=150&h=150&fit=crop&crop=face"
      };
      setCurrentUser(user);
      setIsAuthenticated(true);
      toast({
        title: "Account created!",
        description: "Welcome to our social platform.",
      });
    }
  };

  const handleLike = (postId: number) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, likes: post.likes + 1 }
        : post
    ));
    toast({
      title: "Post liked!",
      description: "Your appreciation has been counted.",
    });
  };

  const handleCreatePost = () => {
    if (newPost.trim() && currentUser) {
      const post: Post = {
        id: posts.length + 1,
        user: currentUser,
        content: newPost,
        likes: 0,
        timestamp: "Just now"
      };
      setPosts(prev => [post, ...prev]);
      setNewPost('');
      toast({
        title: "Post created!",
        description: "Your post has been shared with the community.",
      });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500">
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white mb-2">SocialConnect</h1>
              <p className="text-blue-100">Connect, Share, Inspire</p>
            </div>
            
            <Card className="backdrop-blur-sm bg-white/10 border-white/20">
              <CardHeader>
                <div className="flex space-x-1 justify-center mb-4">
                  <Button
                    variant={showLogin ? "default" : "ghost"}
                    onClick={() => setShowLogin(true)}
                    className="text-white"
                  >
                    Login
                  </Button>
                  <Button
                    variant={!showLogin ? "default" : "ghost"}
                    onClick={() => setShowLogin(false)}
                    className="text-white"
                  >
                    Sign Up
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {showLogin ? (
                  <div className="space-y-4">
                    <Input
                      placeholder="Email"
                      type="email"
                      value={loginForm.email}
                      onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
                      className="bg-white/20 border-white/30 text-white placeholder-white/70"
                    />
                    <Input
                      placeholder="Password"
                      type="password"
                      value={loginForm.password}
                      onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                      className="bg-white/20 border-white/30 text-white placeholder-white/70"
                    />
                    <Button onClick={handleLogin} className="w-full bg-white text-purple-600 hover:bg-white/90">
                      Log In
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Input
                      placeholder="Full Name"
                      value={signupForm.name}
                      onChange={(e) => setSignupForm(prev => ({ ...prev, name: e.target.value }))}
                      className="bg-white/20 border-white/30 text-white placeholder-white/70"
                    />
                    <Input
                      placeholder="Email"
                      type="email"
                      value={signupForm.email}
                      onChange={(e) => setSignupForm(prev => ({ ...prev, email: e.target.value }))}
                      className="bg-white/20 border-white/30 text-white placeholder-white/70"
                    />
                    <Input
                      placeholder="Password"
                      type="password"
                      value={signupForm.password}
                      onChange={(e) => setSignupForm(prev => ({ ...prev, password: e.target.value }))}
                      className="bg-white/20 border-white/30 text-white placeholder-white/70"
                    />
                    <Textarea
                      placeholder="Tell us about yourself..."
                      value={signupForm.bio}
                      onChange={(e) => setSignupForm(prev => ({ ...prev, bio: e.target.value }))}
                      className="bg-white/20 border-white/30 text-white placeholder-white/70"
                    />
                    <Button onClick={handleSignup} className="w-full bg-white text-purple-600 hover:bg-white/90">
                      Create Account
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                SocialConnect
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={currentUser?.avatar} />
                  <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">{currentUser?.name}</span>
              </div>
              <Button 
                variant="outline" 
                onClick={() => setIsAuthenticated(false)}
                className="text-sm"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Create Post */}
          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src={currentUser?.avatar} />
                  <AvatarFallback><User className="h-5 w-5" /></AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{currentUser?.name}</h3>
                  <p className="text-sm text-gray-500">{currentUser?.username}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="What's on your mind?"
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                className="min-h-[100px] border-0 bg-gray-50 resize-none focus:bg-white transition-colors"
              />
              <div className="flex justify-end">
                <Button 
                  onClick={handleCreatePost}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                  disabled={!newPost.trim()}
                >
                  Share Post
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Posts Feed */}
          <div className="space-y-6">
            {posts.map((post) => (
              <Card key={post.id} className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 animate-fade-in">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={post.user.avatar} />
                      <AvatarFallback><User className="h-5 w-5" /></AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold">{post.user.name}</h3>
                        <span className="text-gray-500 text-sm">{post.user.username}</span>
                        <span className="text-gray-400">•</span>
                        <span className="text-gray-400 text-sm">{post.timestamp}</span>
                      </div>
                      <p className="text-sm text-gray-600">{post.user.bio}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-800 leading-relaxed">{post.content}</p>
                  {post.image && (
                    <div className="rounded-lg overflow-hidden">
                      <img 
                        src={post.image} 
                        alt="Post content" 
                        className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="flex items-center space-x-6 pt-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLike(post.id)}
                      className="flex items-center space-x-2 text-gray-600 hover:text-red-500 hover:bg-red-50 transition-colors group"
                    >
                      <Heart className="h-5 w-5 group-hover:fill-current transition-all duration-200" />
                      <span className="font-medium">{post.likes}</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 hover:bg-blue-50">
                      <MessageSquare className="h-5 w-5" />
                      <span>Comment</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center space-x-2 text-gray-600 hover:text-green-500 hover:bg-green-50">
                      <Users className="h-5 w-5" />
                      <span>Share</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
