import { useState } from "react";
import './tagStyles.css';

const TagInput = () => {
    const [tags, setTags] = useState([]);

    const handleKeyDown = e => {
        if (e.key !== 'Enter') return
        const value = e.target.value;
        if (!value.trim()) return;
        setTags([...tags, value]);
        e.target.value = '';
    };
    function removeTag(index) {
        setTags(tags.filter((el, i) => i !== index))

    }

    return (
        <div className='tag-input-container'>
            <h3>Tags</h3>
            {tags.map((tag, index) => (
                <div key={index} className='tag-item'>
                    <span className='text'>{tag}</span>
                    <span className='close' onClick={() => removeTag(index)}>&times;</span>
                </div>
            ))}
            <input onKeyDown={handleKeyDown} type="text" placeholder="type tags" name="tagsItem" className="tags-input border-0 outline-none" />
        </div>
    );
};

export default TagInput;
