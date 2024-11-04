function ErrorDisplay({ errorMessage }) {
    if (!errorMessage) return null

    return (
        <>
            <div className="absolute top-4 left-4 z-50 bg-red-500 text-white p-4 rounded-md shadow-lg max-w-xs">
                <p>{ errorMessage }</p>
            </div>
        </>
    )
}

export default ErrorDisplay