export function YouTube({ id }) {
    return (
        <iframe
            width="100%"
            height="400"
            src={`https://www.youtube.com/embed/${id}`}
            title="YouTube video"
            allowFullScreen
        />
    );
}
