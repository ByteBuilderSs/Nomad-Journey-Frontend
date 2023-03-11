import MyAnnouncements from "../components/UserPanel/MyAnnouncements";

function UserPanelPage() {
    return (
        <section>
            <h1>User Panel</h1>
            <ul>
                <li>
                    <MyAnnouncements />
                </li>
            </ul>
        </section>
    );
}

export default UserPanelPage;