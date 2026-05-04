import Link from "next/link";


const NotFound= () => {
    return (
        <div className="flex items-center justify-center min-h-screen">
             <div className="card bg-primary text-primary-content w-96">
                <div className="card-body">
                    <h2 className="card-title">404 Not Found!</h2>
                    <p>This URL is Invalid</p>
                    <div className="card-actions justify-end">
                    <Link href="/" className="btn" >Home</Link>
                    </div>
                </div>
                </div>
        </div>
    );
};

export default NotFound ; 