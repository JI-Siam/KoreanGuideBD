import UniversityList from "@/components/universities/UniversityList";


const page = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3005'}/universities`);
    const universities = await res.json();

    return (
        <div>
            <UniversityList universities={universities}></UniversityList>
        </div>
    );
};

export default page;