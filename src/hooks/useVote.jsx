import { useState, useCallback } from 'react';
import axios from 'axios';

const useVote = (initialVotes = {}) => {
    const [userVotes, setUserVotes] = useState(initialVotes);

    const updateVoteCount = useCallback(async (productId, voteType) => {
        try {
            const response = await axios.put(`/product-vote/votes/${productId}`, { voteType });
            if (response.status === 200) {
                return response.data;
            } else {
                console.error('Failed to update vote');
            }
        } catch (error) {
            console.error('Error updating vote:', error);
        }
    }, []);

    const handleVote = useCallback(async (productId, voteType) => {
        setUserVotes((prevVotes) => {
            if (prevVotes[productId] === voteType) return prevVotes;
            const updatedVotes = { ...prevVotes, [productId]: voteType };
            return updatedVotes;
        });

        const updatedVoteCounts = await updateVoteCount(productId, voteType);

        if (updatedVoteCounts) {
            setUserVotes((prevVotes) => ({
                ...prevVotes,
                [productId]: voteType,
            }));
        }
    }, [updateVoteCount]);

    const handleUpVote = useCallback((productId) => {
        handleVote(productId, 'upvoted');
    }, [handleVote]);

    const handleDownVote = useCallback((productId) => {
        handleVote(productId, 'downvoted');
    }, [handleVote]);

    return {
        userVotes,
        handleUpVote,
        handleDownVote,
    };
};

export default useVote;
