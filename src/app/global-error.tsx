"use client";

import { useEffect } from "react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <html>
            <head>
                <title>Something went wrong!</title>
            </head>
            <body>
                <h2>Something went wrong!</h2>
                <p>{error.message}</p>
                <button onClick={() => reset()}>Try again</button>
            </body>
        </html>
    );
}
