import { useEffect } from 'react';
import {
    Youtube, Twitter, Instagram, Linkedin, Globe, Share2
} from "lucide-react";

export function Card({ title, link, type }) {
    const getYouTubeEmbedLink = (url) => {
        const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/))([^?&]+)/);
        return match ? `https://www.youtube.com/embed/${match[1]}` : url;
    };

    const getTwitterEmbedLink = (url) => {
        const match = url.match(/status\/(\d+)/) || url.match(/twitter\.com\/\w+\/status\/(\d+)/);
        return match ? match[1] : null;
    };

    useEffect(() => {
        if (type === 'twitter') {
            const script = document.createElement('script');
            script.src = 'https://platform.twitter.com/widgets.js';
            script.async = true;
            script.charset = 'utf-8';
            document.body.appendChild(script);
            return () => document.body.removeChild(script);
        }
    }, [type]);

    useEffect(() => {
        if (type === 'instagram') {
            const script = document.createElement('script');
            script.src = 'https://www.instagram.com/embed.js';
            script.async = true;
            document.body.appendChild(script);
            script.onload = () => {
                if (window.instgrm) {
                    window.instgrm.Embeds.process();
                }
            };
            return () => document.body.removeChild(script);
        }
    }, [type]);

    const renderIcon = () => {
        switch (type) {
            case "youtube": return <Youtube className="text-red-500 w-5 h-5" />;
            case "twitter": return <Twitter className="text-sky-500 w-5 h-5" />;
            case "instagram": return <Instagram className="text-pink-500 w-5 h-5" />;
            case "linkedin": return <Linkedin className="text-blue-700 w-5 h-5" />;
            case "blog": return <Globe className="text-green-600 w-5 h-5" />;
            default: return <Globe className="text-gray-500 w-5 h-5" />;
        }
    };

    return (
        <div className="p-5 bg-white rounded-2xl shadow-xl border border-gray-200 max-w-sm w-full transition-all hover:shadow-2xl hover:scale-[1.015] duration-200">
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2 text-slate-800 font-semibold text-base">
                    {renderIcon()}
                    <span className="line-clamp-1">{title}</span>
                </div>
                <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-blue-500 transition"
                    title="Open Original"
                >
                    <Share2 className="w-5 h-5" />
                </a>
            </div>

            {/* YouTube */}
            {type === "youtube" && (
                <div className="aspect-video rounded-lg overflow-hidden">
                    <iframe
                        src={getYouTubeEmbedLink(link)}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className="w-full h-full"
                    ></iframe>
                </div>
            )}

            {/* Twitter */}
            {type === "twitter" && (
                <div className="mt-4">
                    <blockquote className="twitter-tweet" data-lang="en" data-dnt="true">
                        <a href={`https://twitter.com/i/status/${getTwitterEmbedLink(link)}`}>
                            Loading Twitter post...
                        </a>
                    </blockquote>
                </div>
            )}

            {/* Instagram */}
            {type === "instagram" && (
                <div className="mt-4">
                    <blockquote
                        className="instagram-media"
                        data-instgrm-permalink={link}
                        data-instgrm-version="14"
                        style={{
                            background: "#FFF",
                            border: "0",
                            margin: "1px auto",
                            maxWidth: "540px",
                            width: "100%",
                            borderRadius: "12px",
                        }}
                    ></blockquote>
                </div>
            )}

            {/* LinkedIn */}
            {type === "linkedin" && (
                <div className="mt-4">
                    <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block border border-blue-100 p-4 rounded-lg bg-blue-50 hover:bg-blue-100 transition"
                    >
                        <p className="text-blue-600 font-semibold text-sm">View LinkedIn Post</p>
                        <p className="text-xs text-gray-500 truncate mt-1">{link}</p>
                    </a>
                </div>
            )}

            {/* Blog or Other */}
            {(type === "blog" || type === "other") && (
                <div className="mt-4">
                    <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline text-sm"
                    >
                        View {type === "blog" ? "Blog Post" : "Content"}
                    </a>
                </div>
            )}
        </div>
    );
}
