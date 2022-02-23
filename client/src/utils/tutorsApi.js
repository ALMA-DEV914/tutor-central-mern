//api for tutors
export const searchTutors = (query) => {
    return fetch(`https://socket.tutorcruncher.com/contractors?q=${query}`);
};
