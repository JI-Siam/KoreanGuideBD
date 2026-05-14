import UniversityList from "@/components/universities/UniversityList";


const page = async () => {
    const res = await fetch("http://localhost:3004/universities");
    const universities = await res.json();

    return (
        <div>
            <UniversityList universities={universities}></UniversityList>
        </div>
    );
};

export default page;