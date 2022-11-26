export default function Notifications() {
    return (
        <>
            <div className="text-start">
                <h3 className="mb-4">Notification Settings</h3>
                <div className="form-group">
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="notification1"/>
                        <label className="form-check-label" htmlFor="notification1">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum accusantium
                            accusamus, neque cupiditate quis
                        </label>
                    </div>
                </div>
                <div className="form-group">
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="notification2"/>
                        <label className="form-check-label" htmlFor="notification2">
                            hic nesciunt repellat perferendis voluptatum totam porro eligendi.
                        </label>
                    </div>
                </div>
                <div className="form-group">
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="notification3"/>
                        <label className="form-check-label" htmlFor="notification3">
                            commodi fugiat molestiae tempora corporis. Sed dignissimos suscipit
                        </label>
                    </div>
                </div>

                <div className="mt-5">
                    <hr/>
                    <div className="row">
                        <div className="col-md-6 text-start">
                            <button className="btn btn-outline-danger">Cancel</button>
                        </div>
                        <div className="col-md-6 text-end">
                            <button className="btn btn-outline-primary">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}