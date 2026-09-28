import React from 'react';

const Loading = () => {
    return (
        <div className="flex items-center justify-center min-h-[60vh] w-full">
            <div className="flex flex-col items-center gap-3">
                <span className="loading loading-dots loading-xl text-green-300"></span>
                <p className="text-sm text-base-content/60 font-medium tracking-wide animate-pulse">
                    Loading, please wait...
                </p>
            </div>
        </div>
    );
};

export default Loading;