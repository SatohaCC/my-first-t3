"use client";

import { useState } from "react";

import { api } from "~/trpc/react";

export function LatestPost() {
    // 最新の投稿を取得するためのクエリ
    const [latestPost] = api.post.getLatest.useSuspenseQuery();

    const utils = api.useUtils();
    const [name, setName] = useState("");
    const createPost = api.post.create.useMutation({
        // 投稿作成が成功したときの処理
        onSuccess: async () => {
            // キャッシュを無効化して最新のデータを取得
            await utils.post.invalidate();
            // 入力フィールドをクリア
            setName("");
        },
    });

    return (
        <div className="w-full max-w-xs">
            {latestPost ? (
                // 最新の投稿がある場合の表示
                <p className="truncate">Your most recent post: {latestPost.name}</p>
            ) : (
                // 最新の投稿がない場合の表示
                <p>You have no posts yet.</p>
            )}
            <form
                // フォームの送信処理
                onSubmit={(e) => {
                    e.preventDefault();
                    createPost.mutate({ name });
                }}
                className="flex flex-col gap-2"
            >
                <input
                    // 投稿のタイトル入力フィールド
                    type="text"
                    placeholder="Title"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-full px-4 py-2 text-black"
                />
                <button
                    // 投稿ボタン
                    type="submit"
                    className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
                    disabled={createPost.isPending}
                >
                    {createPost.isPending ? "Submitting..." : "Submit"}
                </button>
            </form>
        </div>
    );
}
