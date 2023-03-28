import NewAnnouncementForm from "../components/Announcements/AddAnnouncement/NewAnnouncementForm";
import HeaderComponent from "../components/Announcements/AddAnnouncement/Header";
function NewAnnouncementFormPage() {
    return (
        <section>
            <h1>Add New Announcement</h1>
            <HeaderComponent />
            <NewAnnouncementForm />
        </section>
    );
}

export default NewAnnouncementFormPage;  