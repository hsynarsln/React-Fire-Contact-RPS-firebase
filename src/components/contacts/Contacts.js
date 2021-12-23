import { Icon, Table } from 'semantic-ui-react';
import { deleteInfo, useFetch } from '../../utils/firebase';

const Contacts = ({ editHandler }) => {
  const { contactList, isLoading } = useFetch();

  return (
    <div>
      <h2 className='contact-header'>Contacts</h2>
      <Table size={'large'} className='table'>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell textAlign='center'>Username</Table.HeaderCell>
            <Table.HeaderCell textAlign='center'>Phone Number</Table.HeaderCell>
            <Table.HeaderCell textAlign='center'>Gender</Table.HeaderCell>
            <Table.HeaderCell textAlign='center'>Delete</Table.HeaderCell>
            <Table.HeaderCell textAlign='center'>Edit</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {/* //! isLoading true --> loading... , false --> contactList mevcut ise length = 0 ise Nothing found , lengt > 0 ise map ile gezerek table içerisine monte et */}
          {isLoading ? (
            <Table.Row>
              <Table.Cell colSpan={5} textAlign='center'>
                <p>Loading...</p>
              </Table.Cell>
            </Table.Row>
          ) : contactList?.length === 0 ? (
            <Table.Row>
              <Table.Cell colSpan={5} textAlign='center'>
                <p className='nothing-found'>Nothing Found</p>
              </Table.Cell>
            </Table.Row>
          ) : (
            contactList?.map((item, index) => (
              <Table.Row key={index}>
                <Table.Cell textAlign='center'>{item.username.toUpperCase()}</Table.Cell>
                <Table.Cell textAlign='center'>{item.phoneNumber}</Table.Cell>
                <Table.Cell textAlign='center'>{item.gender}</Table.Cell>
                <Table.Cell textAlign='center' className='delete'>
                  {/* //! firebase de oluşturduğumuz fonksiyonu çağırdık ve parametre olarak id verdik */}
                  <Icon name='delete' onClick={() => deleteInfo(item.id)} />
                </Table.Cell>
                <Table.Cell textAlign='center' className='edit'>
                  <Icon
                    name='edit'
                    onClick={() =>
                      //! update olacak değerleri gönderiyoruz.
                      editHandler(item.id, item.username, item.phoneNumber, item.gender)
                    }
                  />
                </Table.Cell>
              </Table.Row>
            ))
          )}
        </Table.Body>
      </Table>
    </div>
  );
};
export default Contacts;
