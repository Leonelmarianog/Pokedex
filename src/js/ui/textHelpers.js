/**
 * @param {Boolean} status
 */
export default function setLoading(status) {
  if (!status) {
    document.querySelector('#loading').textContent = '';
  } else {
    document.querySelector('#loading').textContent = 'Loading...';
  }
}
