import React from 'react';

function ShimmerEffect() {
    const arry = new Array(22).fill(null);

    return (
        <>
            <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 px-4">
                {arry.map((_, i) => (
                    <div key={i} className="p-2 w-full max-w-md">
                        <div className="bg-white p-3 rounded-2xl shadow-[inset_0_0px_3px_rgba(0,0,0,0.6)] hover:-translate-y-1 transition-transform duration-300">
                            <div className="flex justify-center items-center">
                                <div className="rounded-lg h-80 w-full mb-2 bg-gray-300 animate-pulse"></div>
                            </div>

                            <div className="h-6 bg-gray-300 rounded mb-2 animate-pulse"></div>
                            <div className="h-5 bg-gray-300 rounded mb-2 animate-pulse"></div>
                            <div className="h-5 bg-gray-300 rounded mb-2 animate-pulse w-2/3"></div>

                            <div className="flex space-x-2 justify-between mt-2">
                                <div className="bg-gray-300 h-10 w-24 rounded-lg animate-pulse"></div>
                                <div className="bg-gray-300 h-10 w-24 rounded-lg animate-pulse"></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </>
    );
}

export default ShimmerEffect;
