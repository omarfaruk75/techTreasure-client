const SectionTitle = ({ heading, subHeading }) => {
    return (
        <div className="md:w-5/12 mx-auto text-center my-8">
            <p className="text-yellow-600 mb-2"> {subHeading}</p>
            <h3 className="text-4xl font-semibold  uppercase py-4">{heading}</h3>
        </div>
    );
};

export default SectionTitle;