import Cookies from 'js-cookie';

// export const getAllReviews = (state) => Object.values(state.spots.??????)
export const getAllReviews = (state) => Object.values(state.reviews.spot)

const LOAD_ALL = 'reviews/LOAD_ALL';

const loadReviews = reviews => ({
    type: LOAD_ALL,
    reviews
});

export const getReviews = (id) => async dispatch => {
    const response = await fetch(`/api/spots/${id}/reviews`);
    if (response.ok) {
        const reviewsObj = await response.json();
        await dispatch(loadReviews(reviewsObj.Reviews));
    }
};

export const createReview = (payload) => async dispatch => {
    const response = await fetch(`/api/spots/${payload.id}/reviews`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "XSRF-token": Cookies.get('XSRF-TOKEN')
        },
        body: JSON.stringify(payload)
    })
    if (response.ok) {
        const review = await response.json()
        await dispatch(getReviews(payload.id))
        return review
    }
}

const initialState = {
    spot: {},
    user: {}
};

const reviewsReducer = (state = initialState, action) => {
    let newState = {}
    switch (action.type) {
        case LOAD_ALL:
            const spotReviews = {};
            action.reviews.forEach(review => {
                spotReviews[review.id] = review;
            });
            return {
                spot: spotReviews,
                user: {...state.user}
            }
        default:
            return state;
    }
};

export default reviewsReducer;
